import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../model/product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductService)
  products:  IProduct[] = []

  ngOnInit(): void {
      this.getProducts()
  }

  getProducts(){
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

}
