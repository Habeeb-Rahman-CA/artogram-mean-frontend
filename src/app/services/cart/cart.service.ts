import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = 'http://localhost:8001/api/cart'

  constructor(private http: HttpClient) { }

  //Cart APIs
  addCart(userId: string, productId: string | undefined) {
    return this.http.post(this.baseUrl, { userId, productId }, { withCredentials: true })
  }
  
  getCart(userId: string) {
    return this.http.get(`${this.baseUrl}/${userId}`, { withCredentials: true })
  }
  
  deleteCartItem(cartId: string, productId: string | undefined){
    return this.http.delete(`${this.baseUrl}/${cartId}/products/${productId}`, {withCredentials: true})
  }
}
