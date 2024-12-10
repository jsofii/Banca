import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/Product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;
  isEditing: boolean = false;
  private productId: string | null = null;
  constructor(private fb: FormBuilder, private productService: ProductService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bindForm();
    this.handleProductIdChanges();
    this.handleDateReleaseChanges();
  }

  private handleDateReleaseChanges() {
    this.formGroup.get('date_release')?.valueChanges.subscribe(value => {
      if (value) {
        const releaseDate = new Date(value);
        const revisionDate = new Date(releaseDate);
        revisionDate.setFullYear(releaseDate.getFullYear() + 1);
        this.formGroup.get('date_revision')?.setValue(revisionDate.toISOString().split('T')[0]);
      }
    });
  }

  private handleProductIdChanges() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId !== null) {
      this.isEditing = true;
      this.formGroup.get('id')?.disable(); // Disable the id field if editing
      this.productService.getProductById(this.productId).subscribe(product => {
        this.formGroup.patchValue(product);
      });
    } else {
      this.isEditing = false
    }
  }

  private bindForm() {
    this.formGroup = this.productService.getFormGroup(this.isEditing);
  }



  isFieldInvalid(field: string): boolean {
    const control = this.formGroup.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onReset(): void {
    this.formGroup.reset();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.handleFormSubmission();
    } else {
      console.error('Form is invalid');
    }
  }

  private handleFormSubmission(): void {
    this.prepareFormForSubmission();
    const product: Product = this.formGroup.value;
    this.restoreFormState();

    if (this.isEditing) {
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }

  private prepareFormForSubmission(): void {
    this.formGroup.get('date_revision')?.enable();
  }

  private restoreFormState(): void {
    this.formGroup.get('date_revision')?.disable();
  }

  private updateProduct(product: Product): void {
    this.productService.updateProduct(this.productId ?? '', product).subscribe(() => {
      this.onReset();
    });
  }

  private createProduct(product: Product): void {
    this.productService.createProduct(product).subscribe(() => {
      this.onReset();
    });
  }
}
