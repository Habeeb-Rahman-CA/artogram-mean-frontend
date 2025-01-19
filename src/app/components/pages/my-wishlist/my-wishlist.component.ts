import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { IProduct } from '../../../model/product';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-wishlist',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.css'
})
export class MyWishlistComponent implements OnInit {

  authService = inject(AuthService)
  wishlistService = inject(WishlistService)

  router = inject(Router)

  userId = this.authService.userData.value._id
  wishlist: IProduct[] = []
  wishlistId: string = ''

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist() {
    this.wishlistService.getWishlist(this.userId).subscribe({
      next: (res: any) => {
        this.wishlist = res.wishlist[0].products
        this.wishlistId = res.wishlist[0]._id
      },
      error: (err) => {
        console.error(err.message)
        alert('failed to fetch')
      }
    })
  }

  deleteWishlist(id: string | undefined) {
    this.wishlistService.deleteWishlist(this.wishlistId, id).subscribe({
      next: () => {
        alert('Item deleted from the wishlist')
        this.getWishlist()
      },
      error: (err) => {
        console.error(err.message)
      }
    })
  }

  viewProduct(id: string | undefined) {
    this.router.navigate(['/products', id])
  }
}
