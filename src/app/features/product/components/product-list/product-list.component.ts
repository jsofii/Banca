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
  visibleProducts: any[] = []; // Products visible in the current page
  pageSize = 5; // Default page size
  currentPage = 1;
  constructor(private productService: ProductService, private router: Router,
              private filterService: ProductFilterService) {
  }
  filteredProducts = this.products;

  ngOnInit(): void {
    this.productService.getProducts().subscribe(it =>{
      console.log(it)
      console.log(it.data)
      this.products = it.data;
      this.filteredProducts = it.data;
      console.log(this.products)
    })

    this.filterService.searchQuery$.subscribe((query) => {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    });
    this.updateVisibleProducts();

  }

  updateVisibleProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.visibleProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  // Handle page size change
  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to the first page
    this.updateVisibleProducts();
  }


  onAction(event: Event, product: Product): void {
    const action = (event.target as HTMLSelectElement).value;
    if (action === 'update') {
      this.router.navigate(['/product/edit', product.id]);
    } else if (action === 'delete') {
    }
  }



}
