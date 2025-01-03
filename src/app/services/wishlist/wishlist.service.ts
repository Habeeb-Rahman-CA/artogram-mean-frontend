import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl = 'http://localhost:8001/api/wishlist'

  constructor(private http: HttpClient) { }

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
