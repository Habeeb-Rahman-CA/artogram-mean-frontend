import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../model/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService)
  router = inject(Router)

  products: IProduct[] = []
  sort: boolean = false

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res
      }
    })
  }

  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }

  toggleSortOrder() {
    this.sort = !this.sort
  }

}
