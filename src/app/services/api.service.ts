import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { LoginResponse, User } from '../models/user.model';
import { DiscountRequest, DiscountResponse } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000/api';

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  calculateDiscount(request: DiscountRequest): Observable<DiscountResponse> {
    return this.http.post<DiscountResponse>(`${this.baseUrl}/cart/discount`, request);
  }
}