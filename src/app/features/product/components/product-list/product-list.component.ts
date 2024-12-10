import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Product } from '../../model/Product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ProductFilterService } from '../../services/product-filter.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-product-list',
  imports: [JsonPipe, CommonModule, SearchInputComponent, ButtonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  visibleProducts: Product[] = [];
  pageSize = 5;

  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;

  constructor(private productService: ProductService,
              private filterService: ProductFilterService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.handleGetProducts();
    this.handleFilterChangeAction();
    this.updateVisibleProducts();
  }

  private handleFilterChangeAction() {
    this.filterService.searchQuery$.subscribe((query) => {
      this.filteredProducts = this.filterService
        .getFilteredProducts(this.products, query);
      this.updateVisibleProducts();
    });
  }

  private handleGetProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('Products response:', response);
        this.products = response.data;
        this.filteredProducts = response.data;
        this.visibleProducts = response.data;
        this.updateVisibleProducts();
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  updateVisibleProducts(): void {
    this.visibleProducts = this.filteredProducts.slice(0, this.pageSize);
  }

  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.updateVisibleProducts();
  }

  onAction(event: Event, product: Product): void {
    const action = (event.target as HTMLSelectElement).value;
    if (action === 'update') {
      this.handleUpdateAction(product);
    } else if (action === 'delete') {
      this.handleDeleteAction(product);
    }
  }

  private handleUpdateAction(product: Product): void {
    this.productService.handleUpdateAction(product);
  }

  private handleDeleteAction(product: Product): void {
    this.openModal();
  }

  private openModal(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = this.modalContainer.createComponent(componentFactory);
    componentRef.instance.openModal();
  }
}
