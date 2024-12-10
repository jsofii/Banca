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
    this.formGroup = this.fb.group({
      id: [{ value: '', disabled: this.isEditing }, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{ value: '2024-12-25', disabled: true }]
    });

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId !== null) {
      this.isEditing = true;
      this.formGroup.get('id')?.disable(); // Disable the id field if editing
      this.productService.getProductById(this.productId).subscribe(product => {
        this.formGroup.patchValue(product);
      });
    }else{
      this.isEditing = false
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

      if(this.isEditing){
        this.productService.updateProduct(this.productId ?? '', product).subscribe(() => {
          this.onReset();
        });
      }else{
        this.productService.createProduct(product).subscribe(() => {
          this.onReset();
        });
      }

    } else {
      console.error('Form is invalid');
    }
  }
}
