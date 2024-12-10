import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  private searchQuerySubject = new BehaviorSubject<string>(''); // Initial empty query
  searchQuery$ = this.searchQuerySubject.asObservable();

  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query); // Notify all subscribers
  }
}
