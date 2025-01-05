import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';
import { IProduct } from '../../../model/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-my-cart',
  imports: [CommonModule, FormsModule, DialogModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent implements OnInit {

  authService = inject(AuthService)
  cartService = inject(CartService)

  userId = this.authService.userData.value._id
  cart: IProduct[] = []
  cartId: string = ''
  cartTotal: number = 0
  visible: boolean = false;

  ngOnInit(): void {
      this.getCart()
  }

  getCart(){
    this.cartService.getCart(this.userId).subscribe({
      next: (res:any) =>{
        this.cart = res.cart[0].products
        this.cartId = res.cart[0]._id
        this.cartTotal = this.cart.reduce((sum, product) => sum + parseFloat(product.price), 0)
      },
      error: (err) =>{
        alert('Error while fetching')
        console.error(err.message)
      }
    })
  }

  deleteCart(id: string | undefined){
    this.cartService.deleteCartItem(this.cartId, id).subscribe({
      next: () =>{
        alert('Product deleted from the cart')
        this.getCart()
      },
      error: (err) =>{
        alert('Product failed to delete')
        console.error(err.message)
      }
    })
  }

  showDialog(){
    this.visible = true
  }
}
