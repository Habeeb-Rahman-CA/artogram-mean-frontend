import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../../../model/product';
import { ProductService } from '../../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../services/cart/cart.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { WishlistService } from '../../../../services/wishlist/wishlist.service';

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
  wishlistService = inject(WishlistService)

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

  //Product APIs 
  getProductById(id: string | null) {
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res.product
        this.suggestedProductList = res.suggestedProduct
        this.popularProductList = res.popularProduct
      }
    })
  }

  //Add Cart API
  addCart(productId: string | undefined) {
    this.cartService.addCart(this.userId, productId).subscribe({
      next: (res: any) => {
        if (res.alreadyExists) {
          alert('Product is already exist in the cart')
        } else {
          alert('Product added to cart')
        }
      },
      error: (err) => {
        alert('failed to add cart')
        console.error(err.message);
      }
    })
  }

  //Add Wishlist API
  addWishlist(productId: string | undefined) {
    this.wishlistService.addWishlist(this.userId, productId).subscribe({
      next: (res: any) => {
        if (res.alreadyExists) {
          alert('Product is already exist in the wishlist')
        } else {
          alert('Product added to wishlist')
        }
      },
      error: (err) => {
        alert('failed to add wishlist')
        console.error(err.message)
      }
    })
  }

  //Dialog Open
  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }

  viewArtist(id: string | undefined) {
    this.router.navigate(['/artist', id])
  }
}
