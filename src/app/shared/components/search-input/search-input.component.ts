// src/app/shared/components/search-input/search-input.component.ts
import { Component, Input } from '@angular/core';
import {ProductFilterService} from '../../../features/product/services/product-filter.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';
  constructor(private filterService: ProductFilterService) {}

  onSearch(event: Event): void {
    console.log('searching...');
    const query = (event.target as HTMLInputElement).value;
    this.filterService.updateSearchQuery(query); // Update the query in the service
  }
}
