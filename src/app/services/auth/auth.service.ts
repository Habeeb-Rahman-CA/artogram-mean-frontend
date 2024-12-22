import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8001/api/auth';

  registerUser(name: string, email: string, password: string){
    return this.http.post(`${this.baseUrl}/register`, {name, email, password});
  }

  loginUser(email: string, password: string){
    return this.http.post(`${this.baseUrl}/login`, {email, password}, {withCredentials: true});
  }

  logoutUser(){
    return this.http.post(`${this.baseUrl}/logout`, {}, {withCredentials: true});
  }
}
