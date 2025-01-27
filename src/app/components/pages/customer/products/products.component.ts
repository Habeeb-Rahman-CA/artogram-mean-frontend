import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { IProduct } from '../../../../model/product';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService)
  router = inject(Router)

  products: IProduct[] = []
  filteredProduct: IProduct[] = []

  isLoading: boolean = false
  loaderRows = Array(8).fill(0)

  categories: string[] = ['Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art']
  selectedCategory: string = ''
  searchQuery: string = ''
  selectedSort: 'asc' | 'desc' = 'asc'

  sort: boolean = false

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.isLoading = true
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res
        this.filteredProduct = [...this.products]
        this.isLoading = false
      },
      error: (err) =>{
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }

  toggleSortOrder() {
    this.sort = !this.sort
    this.selectedSort = this.sort ? 'asc' : 'desc'
    this.filterBySort()
  }

  filerByCategory() {
    this.filteredProduct = this.products.filter((product) => {
      return this.selectedCategory ? product.category === this.selectedCategory : true
    })
    this.filterBySearch()
    this.filterBySort()
  }

  filterBySearch() {
    this.filteredProduct = this.filteredProduct.filter((product) => {
      return product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    })
  }

  filterBySort() {
    this.filteredProduct = [...this.filteredProduct].sort((a, b) => {
      const priceA = Number(a.price)
      const priceB = Number(b.price)
      return this.selectedSort === 'asc' ? priceA - priceB : priceB - priceA
    })
  }

  applyFilter() {
    this.filteredProduct = [...this.products]
    this.filerByCategory()
    this.filterBySearch()
    this.filterBySort()
  }

}
