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

  constructor(private fb: FormBuilder, private productService: ProductService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{ value: '2024-12-25', disabled: true }]
    });
    console.log('GOING HERE!!!')
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      console.log('GOING HERE!222!!')

      this.productService.getProductById(productId).subscribe(product => {
        console.log('PRODUCT!!', product)
        this.formGroup.patchValue(product);
      });
    }
  }

  // Check if a field is invalid
  isFieldInvalid(field: string): boolean {
    const control = this.formGroup.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Reset the form to its initial state
  onReset(): void {
    this.formGroup.reset();
  }

  // Handle form submission
  onSubmit(): void {
    if (this.formGroup.valid) {
      // Enable the date_revision field to include it in the form value
      this.formGroup.get('date_revision')?.enable();

      const product: Product = this.formGroup.value;

      // Disable the date_revision field again if needed
      this.formGroup.get('date_revision')?.disable();

      this.productService.createProduct(product).subscribe(() => {
        console.log('Product created successfully');
        this.onReset();
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
