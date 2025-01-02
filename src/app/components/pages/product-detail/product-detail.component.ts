import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  productService = inject(ProductService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  popularProductList: IProduct[] = []
  suggestedProductList: IProduct[] = []

  product: IProduct = {
    name: '',
    desc: '',
    category: '',
    price: '',
    img: '',
    createdBy: {
      _id: '',
      name: '',
      profilePic: ''
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']
      this.getProductById(id)
    })
  }

  getProductById(id: string | null) {
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res.product
        this.suggestedProductList = res.suggestedProduct
        this.popularProductList = res.popularProduct
      }
    })
  }

  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }
}
