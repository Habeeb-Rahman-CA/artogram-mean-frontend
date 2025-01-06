import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:8001/api/order'

  constructor(private http: HttpClient) { }

  checkout(addressId: string | undefined) {
    return this.http.post(`${this.baseUrl}/checkout`, { addressId }, { withCredentials: true })
  }
}
