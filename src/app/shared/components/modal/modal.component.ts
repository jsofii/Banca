import { Component } from '@angular/core';
import {ProductService} from '../../../features/product/services/product.service';
import {RefreshService} from '../../../core/services/refresh.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  productId: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService, private refreshService: RefreshService) {

  }
  openModal(productId: string) {
    this.productId = productId
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.add('show');
    }
  }

  closeModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.remove('show');
    }
  }

  confirmDelete() {
    this.productService.deleteProductById(this.productId).subscribe({
      next: () => {
        this.refreshService.triggerRefresh();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting product:', error);
        this.errorMessage = 'An error occurred while deleting the product. Please try again later.';
      }
    });
  }
}
