// src/app/features/product/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product, ProductResponse} from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002/bp'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  // Update an existing product
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  // Get a product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // Get all products
  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products`);
  }
}
