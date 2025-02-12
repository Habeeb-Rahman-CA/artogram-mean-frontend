import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress, IUpgradeRole, IUser } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://artogram-mean-backend.onrender.com/api/user'

  constructor(private http: HttpClient) { }

  //User APIs
  getUser() {
    return this.http.get(this.baseUrl, { withCredentials: true })
  }

  getAllUser() {
    return this.http.get(`${this.baseUrl}/admin`, { withCredentials: true })
  }

  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`, { withCredentials: true })
  }

  getAllArtist() {
    return this.http.get(`${this.baseUrl}/artist`, { withCredentials: true })
  }

  getAllArtistExceptLogger() {
    return this.http.get(`${this.baseUrl}/collab`, { withCredentials: true })
  }

  updateUserProfile(user: Partial<IUser>) {
    return this.http.patch(`${this.baseUrl}/profile`, { user }, { withCredentials: true })
  }

  //Upload User Image
  uploadUserImage(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, formData, { withCredentials: true })
  }

  //Address APIs
  getAddresses() {
    return this.http.get(`${this.baseUrl}/address`, { withCredentials: true })
  }

  addAddress(address: IAddress) {
    return this.http.post(`${this.baseUrl}/address`, address, { withCredentials: true })
  }

  deleteAddress(addressId: string | undefined) {
    return this.http.delete(`${this.baseUrl}/address/${addressId}`, { withCredentials: true })
  }

  //Upgrade role APIs
  upgradeRoleReq(response: string) {
    return this.http.post(`${this.baseUrl}/upgrade/request`, { response }, { withCredentials: true })
  }

  getUpgradeRoleReq() {
    return this.http.get(`${this.baseUrl}/upgrade/request`, { withCredentials: true })
  }

  upgradeRoleRes(response: IUpgradeRole) {
    return this.http.patch(`${this.baseUrl}/upgrade/response`, response, { withCredentials: true })
  }

  rejectUpgradeRole(id: string | undefined) {
    return this.http.delete(`${this.baseUrl}/upgrade/reject/${id}`, { withCredentials: true })
  }

  getUpgradeRoleRes(id: string) {
    return this.http.get(`${this.baseUrl}/upgrade/response/${id}`, { withCredentials: true })
  }

}
