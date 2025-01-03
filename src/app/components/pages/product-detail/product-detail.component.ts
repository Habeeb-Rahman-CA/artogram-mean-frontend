import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  authService = inject(AuthService)
  productService = inject(ProductService)
  cartService = inject(CartService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  userId = this.authService.userData.value._id

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

  addCart(productId: string | undefined) {
    this.cartService.addCart(this.userId, productId).subscribe({
      next: (res: any) => {
        if (res.alreadyExists) {
          alert('Product is already exist in the cart')
        } else {
          console.log(res.cart.products);
          alert('Product added to cart')
        }
      },
      error: (err) => {
        alert('failed to add cart')
        console.error(err.message);
      }
    })
  }

  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }
}
