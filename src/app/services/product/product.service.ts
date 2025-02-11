import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://artogram-mean-backend.onrender.com/api/product';

  //Product APIs
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl, { withCredentials: true })
  }

  getProductById(id: string | null): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`, { withCredentials: true })
  }

  getProductByUserId(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/user`, { withCredentials: true })
  }

  getProductByArtistId(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/artist/${id}`, { withCredentials: true })
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product, { withCredentials: true })
  }

  uploadImg(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, formData, { withCredentials: true })
  }

  updateProduct(id: string | undefined, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, product, { withCredentials: true })
  }

  deleteProduct(id: string | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true })
  }
}
