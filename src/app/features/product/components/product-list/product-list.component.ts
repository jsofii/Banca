import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/Product';
import {ProductService} from '../../services/product.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonModule, JsonPipe} from '@angular/common';
import {SearchInputComponent} from '../../../../shared/components/search-input/search-input.component';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {ProductFilterService} from '../../services/product-filter.service';

@Component({
  selector: 'app-product-list',
  imports: [JsonPipe, CommonModule, SearchInputComponent, ButtonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  constructor(private productService: ProductService,
              private filterService: ProductFilterService) {
  }
  filteredProducts = this.products;
  visibleProducts: any[] = [];
  pageSize = 5;

  ngOnInit(): void {
    this.handleGetProducts();
    this.handleFilterChangeAction();
    this.updateVisibleProducts();

  }

  private handleFilterChangeAction() {
    this.filterService.searchQuery$.subscribe((query) => {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      this.updateVisibleProducts();
    });
  }

  private handleGetProducts() {
    this.productService.getProducts().subscribe(it => {
      this.products = it.data;
      this.filteredProducts = it.data;
      this.visibleProducts = it.data;
      this.updateVisibleProducts();
    })
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
    // Implement delete logic here
  }

}
