import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8001/api/user'

  constructor(private http: HttpClient) { }

  getAddresses() {
    return this.http.get(`${this.baseUrl}/address`, {withCredentials: true})
  }

  addAddress(address: IAddress) {
    return this.http.post(`${this.baseUrl}/address`, address, { withCredentials: true })
  }

  deleteAddress(addressId: string | undefined){
    return this.http.delete(`${this.baseUrl}/address/${addressId}`, {withCredentials: true})
  }

}
