import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  private searchQuerySubject = new BehaviorSubject<string>(''); // Initial empty query
  searchQuery$ = this.searchQuerySubject.asObservable();

  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query); // Notify all subscribers
  }

  getFilteredProducts(products: Product[], query: string) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
