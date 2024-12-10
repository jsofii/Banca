import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../config';

@Injectable({ providedIn: 'root' })
export class ProductIdValidator implements AsyncValidator {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.verifyProductById(control.value).pipe(
      map(product => (product ? { productExists: true } : null)),
      catchError(() => of(null))
    );
  }
  verifyProductById(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
  }
}
