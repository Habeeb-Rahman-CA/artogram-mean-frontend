import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { WishlistService } from '../../../../services/wishlist/wishlist.service';
import { IProduct } from '../../../../model/product';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-my-wishlist',
  imports: [CommonModule, RouterModule, ToastModule],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.css'
})
export class MyWishlistComponent implements OnInit {

  authService = inject(AuthService)
  wishlistService = inject(WishlistService)
  messageService = inject(MessageService)

  router = inject(Router)

  userId = this.authService.userData.value._id
  wishlist: IProduct[] = []
  wishlistId: string = ''

  isLoading: boolean = false

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist() {
    this.isLoading = true
    this.wishlistService.getWishlist(this.userId).subscribe({
      next: (res: any) => {
        this.wishlist = res.wishlist[0].products
        this.wishlistId = res.wishlist[0]._id
        this.isLoading = false
      },
      error: (err) => {
        console.error(err.message)
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Network error, failed to fetch', life: 3000 })
        alert('failed to fetch')
        this.isLoading = false
      }
    })
  }

  deleteWishlist(id: string | undefined) {
    this.wishlistService.deleteWishlist(this.wishlistId, id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Removed', data: 'Item removed from the wishlist', life: 3000 })
        this.getWishlist()
      },
      error: (err) => {
        console.error(err.message)
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to remove the item from wishlist', life: 3000 })
      }
    })
  }

  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }
}
