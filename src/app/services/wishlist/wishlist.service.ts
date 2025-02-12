import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl = 'https://artogram-mean-backend.onrender.com/api/wishlist'

  constructor(private http: HttpClient) { }

  //Wishlist APIs
  getWishlist(userId: string) {
    return this.http.get(`${this.baseUrl}/${userId}`, { withCredentials: true })
  }

  addWishlist(userId: string, productId: string | undefined) {
    return this.http.post(this.baseUrl, { userId, productId }, { withCredentials: true })
  }

  deleteWishlist(wishlistId: string, productId: string | undefined) {
    return this.http.delete(`${this.baseUrl}/${wishlistId}/products/${productId}`, { withCredentials: true })
  }


}
