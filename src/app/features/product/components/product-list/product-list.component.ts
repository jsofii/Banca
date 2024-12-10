import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/Product';
import {ProductService} from '../../services/product.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonModule, JsonPipe} from '@angular/common';
import {SearchInputComponent} from '../../../../shared/components/search-input/search-input.component';
import {ButtonComponent} from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-product-list',
  imports: [JsonPipe, CommonModule, SearchInputComponent, ButtonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(it =>{
      console.log(it)
      console.log(it.data)
      this.products = it.data;
      console.log(this.products)
    })
  }

  onAction(event: Event, product: Product): void {
    const action = (event.target as HTMLSelectElement).value;
    if (action === 'update') {
      this.router.navigate(['/product/edit', product.id]);
    } else if (action === 'delete') {
    }
  }



}
