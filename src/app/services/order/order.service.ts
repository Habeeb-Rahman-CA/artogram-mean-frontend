import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:8001/api/order'

  constructor(private http: HttpClient) { }

  //Checkout API
  checkout(addressId: string | undefined) {
    return this.http.post(`${this.baseUrl}/checkout`, { addressId }, { withCredentials: true })
  }

  verifyPayment(paymentResponse: any, razorpayOrderId: string) {
    return this.http.patch(`${this.baseUrl}/payment`, { paymentResponse, razorpayOrderId }, { withCredentials: true })
  }

  //Order APIs
  getOrder() {
    return this.http.get(this.baseUrl, { withCredentials: true })
  }

  getAllOrders() {
    return this.http.get(`${this.baseUrl}/admin`, { withCredentials: true })
  }

  getArtistProductOrder() {
    return this.http.get(`${this.baseUrl}/artist`, { withCredentials: true })
  }

  cancelOrder(orderId: string | undefined) {
    return this.http.patch(`${this.baseUrl}/cancel`, { orderId }, { withCredentials: true })
  }

  removeOrder(orderId: string | undefined) {
    return this.http.delete(`${this.baseUrl}/${orderId}`, { withCredentials: true })
  }
}
