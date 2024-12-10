import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product, ProductResponse} from '../model/Product';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductIdValidator} from '../../../core/validators/product-id-validator.service';
import {environment} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router,
              private productIdValidator: ProductIdValidator) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteProductById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}`);
  }


  getFormGroup(isEditing: boolean): FormGroup<any> {
    return this.fb.group({
      id: [
        { value: '', disabled: isEditing },
        [Validators.required, Validators.minLength(3)],
        [this.productIdValidator.validate.bind(this.productIdValidator)]
      ],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required, Validators.pattern('(https?://.*\.(?:png|jpg))')]],
      date_release: ['', [Validators.required, this.dateValidator]],
      date_revision: [{ value: '', disabled: true }]
    });
  }

  private dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const today = new Date();
    if (date < today) {
      return { 'invalidDate': true };
    }
    return null;
  }

  handleUpdateAction(product: Product): void {
    this.router.navigate(['/product/edit', product.id]);
  }
}
