import { Component } from '@angular/core';
import {ProductService} from '../../../features/product/services/product.service';
import {RefreshService} from '../../../features/product/services/refresh.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  proudctId: string = '';

  constructor(private productService: ProductService, private refreshService: RefreshService) {

  }
  openModal(productId: string) {
    this.proudctId = productId
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
    this.productService.deleteProductById(this.proudctId).subscribe(
      it => {
        console.log('Product deleted successfully');
        this.refreshService.triggerRefresh();

      }
    )
    this.closeModal();
  }
}
