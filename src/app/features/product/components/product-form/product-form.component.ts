import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the reactive form
    this.formGroup = this.fb.group({
      id: ['', Validators.required], // ID field with required validation
      name: ['', Validators.required], // Name field with required validation
      description: ['', Validators.required], // Description field with required validation
      logo: ['', Validators.required], // Logo field with required validation
      releaseDate: ['', Validators.required], // Release Date with required validation
      reviewDate: [{ value: '', disabled: true }], // Disabled Review Date field
    });
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
      console.log('Form Submitted', this.formGroup.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
