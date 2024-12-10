import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product, ProductResponse} from '../model/Product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002/bp'; // Replace with your API URL

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products`);
  }

  getFormGroup( isEditing: boolean): FormGroup<any> {
    return this.fb.group({
      id: [{value: '', disabled: isEditing}, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{disabled: true}]
    });
  }
  handleUpdateAction(product: Product): void {
    this.router.navigate(['/product/edit', product.id]);
  }
}
