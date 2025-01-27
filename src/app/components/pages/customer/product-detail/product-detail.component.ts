import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../../../model/product';
import { ProductService } from '../../../../services/product/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../services/cart/cart.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { WishlistService } from '../../../../services/wishlist/wishlist.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, ToastModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  authService = inject(AuthService)
  productService = inject(ProductService)
  cartService = inject(CartService)
  wishlistService = inject(WishlistService)
  messageService = inject(MessageService)

  route = inject(ActivatedRoute)
  router = inject(Router)

  userId = this.authService.userData.value._id

  popularProductList: IProduct[] = []
  suggestedProductList: IProduct[] = []

  isLoading: boolean = false
  loaderRows = Array(4).fill(0)

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
    this.isLoading = true
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res.product
        this.suggestedProductList = res.suggestedProduct
        this.popularProductList = res.popularProduct
        this.isLoading = false
      },
      error:(err)=>{
        console.error(err.message)
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Network error, failed to fetch', life: 3000 })
      }
    })
  }

  //Add Cart API
  addCart(productId: string | undefined) {
    this.cartService.addCart(this.userId, productId).subscribe({
      next: (res: any) => {
        if (res.alreadyExists) {
          this.messageService.add({ severity: 'info', summary: 'Already Exist', data: 'Product already exist in the cart', life: 3000 })
        } else {
          this.messageService.add({ severity: 'success', summary: 'Added', data: 'Product added to cart', life: 3000 })
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to add cart', life: 3000 })
        console.error(err.message);
      }
    })
  }

  //Add Wishlist API
  addWishlist(productId: string | undefined) {
    this.wishlistService.addWishlist(this.userId, productId).subscribe({
      next: (res: any) => {
        if (res.alreadyExists) {
          this.messageService.add({ severity: 'info', summary: 'Already Exist', data: 'Product already exist in the wishlist', life: 3000 })
        } else {
          this.messageService.add({ severity: 'success', summary: 'Added', data: 'Product added to wishlist', life: 3000 })
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to add wishlist', life: 3000 })
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
