import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../model/product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule, CommonModule, DialogModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductService)
  products: IProduct[] = []
  selectedProduct: IProduct = {
    name: '',
    category: '',
    desc: '',
    price: ''
  }

  visible: boolean = false;
  categories: string[] = []


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
    this.productService.getProductByUserId().subscribe({
      next: (res) => {
        this.products = res
        console.log('Fetched all the products')
      },
      error: (err) => {
        alert('Something went wrong on fetching')
        console.error(err.message)
      }
    })
  }

  updateProduct(id: string | undefined, product: IProduct) {
    this.productService.updateProduct(id, product).subscribe({
      next: () => {
        alert("product updated successfully")
        this.visible = false
        this.getProducts()

      },
      error: (err) => {
        alert('product updation failed')
        console.error(err.message)
      }
    })
  }

  deleteProduct(id: string | undefined) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        alert('Product deleted successfully')
        this.getProducts()
      }
    })
  }

}
