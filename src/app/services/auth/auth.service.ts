import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8001/api/auth';
  userData = new BehaviorSubject<any>(null)

  //Register API
  registerUser(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  //Login API
  loginUser(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true });
  }

  //Logout API
  logoutUser() {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  //Set User data to an subject
  setUser(data: any) {
    localStorage.setItem('currentUser', JSON.stringify(data))
    this.userData.next(data)
  }

  //Get user role
  getUserRole() {
    const role = this.userData.value.role
    return role ? role : null
  }

  //Clear user data from LS
  clearUser() {
      this.userData.next(null)
      localStorage.removeItem('currentUser')
  }

}
