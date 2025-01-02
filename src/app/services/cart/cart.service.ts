import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = 'http://localhost:8001/api/cart'

  constructor(private http: HttpClient) { }

  addCart(userId: string, productId: string | undefined) {
    return this.http.post(this.baseUrl, { userId, productId }, { withCredentials: true })
  }
}
