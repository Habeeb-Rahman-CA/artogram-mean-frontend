import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { IProduct } from '../../../../model/product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule, CommonModule, DialogModule, FormsModule, ToastModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductService)
  messageService = inject(MessageService)

  products: IProduct[] = []
  selectedProduct: IProduct = {
    name: '',
    category: '',
    desc: '',
    price: ''
  }

  visible: boolean = false;
  categories: string[] = []

  isLoading: boolean = false
  loaderRows = Array(4).fill(0)

  ngOnInit(): void {
    this.getProducts()
    this.categories = ['Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art']
  }

  //Dialog function
  showUpdateDialog(product: IProduct) {
    this.selectedProduct = { ...product }
    this.visible = true;
  }

  //Product APIs
  getProducts() {
    this.isLoading = true
    this.productService.getProductByUserId().subscribe({
      next: (res) => {
        this.products = res
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed to fetch', life: 3000})
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  updateProduct(id: string | undefined, product: IProduct) {
    this.productService.updateProduct(id, product).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Updated', detail: 'Successfully updated product detail', life: 3000})
        this.visible = false
        this.getProducts()

      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed to sent the response', life: 3000})
        console.error(err.message)
      }
    })
  }

  deleteProduct(id: string | undefined) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Deleted', detail: 'Product deleted successfully', life: 3000})
        this.getProducts()
      },
      error: (err) =>{
        console.error(err.message)
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed to delete the product', life: 3000})
      }
    })
  }

}
