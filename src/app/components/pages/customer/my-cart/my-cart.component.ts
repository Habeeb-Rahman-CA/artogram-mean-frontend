import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { CartService } from '../../../../services/cart/cart.service';
import { IProduct } from '../../../../model/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IAddress } from '../../../../model/user';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { WindowService } from '../../../../services/window/window.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

declare var Razorpay: any

@Component({
  selector: 'app-my-cart',
  imports: [CommonModule, FormsModule, DialogModule, TooltipModule, ToastModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})

export class MyCartComponent implements OnInit {

  authService = inject(AuthService)
  cartService = inject(CartService)
  userService = inject(UserService)
  orderService = inject(OrderService)
  windowRef = inject(WindowService)
  router = inject(Router)
  messageService = inject(MessageService)

  Razorpay: any
  userId = this.authService.userData.value._id
  cart: IProduct[] = []
  cartId: string = ''
  cartTotal: number = 0
  visible: boolean = false;

  addressShown: boolean = false
  addressList: IAddress[] = []
  selectedAddress: string = ''
  isLoading: boolean = false

  address: IAddress = {
    address: '',
    city: '',
    fullName: '',
    landmark: '',
    phoneNumber: '',
    pincode: '',
    state: '',
    street: ''
  }

  ngOnInit(): void {
    this.getCart()
    this.getAddress()
  }

  //Cart based APIs
  getCart() {
    this.isLoading = true
    this.cartService.getCart(this.userId).subscribe({
      next: (res: any) => {
        this.cart = res.cart[0].products
        this.cartId = res.cart[0]._id
        this.cartTotal = this.cart.reduce((sum, product) => sum + parseFloat(product.price), 0)
        this.isLoading = false
      },
      error: (err) => {
        alert('Error while fetching')
        this.messageService.add({ severity: 'error', summary: 'Error', data: 'Network error, failed to fetch', life: 3000 })
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  deleteCart(id: string | undefined) {
    this.cartService.deleteCartItem(this.cartId, id).subscribe({
      next: () => {
        alert('Product removed from the cart')
        this.messageService.add({ severity: 'success', summary: 'Deleted', data: 'Product removed from the cart', life: 3000 })
        this.getCart()
      },
      error: (err) => {
        alert('Product failed to delete')
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Product failed to remove from the cart', life: 3000 })
        console.error(err.message)
      }
    })
  }

  //Address based APIs
  addAddress() {
    this.userService.addAddress(this.address).subscribe({
      next: () => {
        this.visible = false
        this.messageService.add({ severity: 'success', summary: 'Added', data: 'Successfully added new address', life: 3000 })
        this.getAddress()
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to add new address', life: 3000 })
        console.error(err.message)
      }
    })
  }

  getAddress() {
    this.isLoading = true
    this.userService.getAddresses().subscribe({
      next: (res: any) => {
        this.addressList = res.addresses
        this.isLoading = false
      },
      error: (err) => {
        console.error(err.message)
        this.messageService.add({ severity: 'error', summary: 'Error', data: 'Network error, failed to fetch', life: 3000 })
      }
    })
  }

  deleteAddress(addressId: string | undefined) {
    this.userService.deleteAddress(addressId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', data: 'Successfully deleted the address', life: 3000 })
        this.addressShown = false
        this.getAddress()
      },
      error: (err) => {
        alert('failed to delete')
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to delete the address', life: 3000 })
        console.error(err.message)
      }
    })
  }

  //Checkout API
  checkout() {
    this.orderService.checkout(this.selectedAddress).subscribe({
      next: (res: any) => {
        const { razorpayOrderId, amount, currency } = res
        const options = {
          key: 'rzp_test_HZlSHqpedcWyNI',
          amount: amount,
          currency: currency,
          name: 'ArtOgram',
          order_id: razorpayOrderId,
          theme: {
            color: '#f56e0f',
          },
          handler: (paymentResponse: any) => {
            this.verifyPayment(paymentResponse, razorpayOrderId);
          },
          modal: {
            ondismiss: () => {
              this.messageService.add({ severity: 'info', summary: 'Cancelled', data: 'Payment process has been cancelled', life: 3000 })
            }
          }
        };
        const razorpay = new this.windowRef.nativeWindow.Razorpay(options)
        razorpay.open()
        this.messageService.add({ severity: 'success', summary: 'Processing...', data: 'Order placed and payment has been processing', life: 3000 })
      },
      error: (err) => {
        console.error(err.message)
        this.messageService.add({ severity: 'error', summary: 'Error', data: 'Failed to Place the order', life: 3000 })
        alert('failed to place order')
      }
    })
  }

  //Verified payment
  verifyPayment(paymentResponse: any, razorpayOrderId: string) {
    this.orderService.verifyPayment(paymentResponse, razorpayOrderId).subscribe({
      next: () => {
        alert('Payment verified successfully and Order shipped!')
        this.messageService.add({ severity: 'success', summary: 'Verified', data: 'Payment has been verified and Order shipped successfully', life: 3000 })
        this.cart = []
      },
      error: (err) => {
        console.error(err.message);
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Payment verification failed', life: 3000 })
        this.cart = []
      }
    })
  }

  //Dialog Open
  showDialog() {
    this.visible = true
  }

  showAddress() {
    this.addressShown = true
  }
}
