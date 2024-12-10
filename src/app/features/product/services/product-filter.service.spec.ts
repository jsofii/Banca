import { TestBed } from '@angular/core/testing';
import { ProductFilterService } from './product-filter.service';

describe('ProductFilterService', () => {
  let service: ProductFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial empty search query', (done) => {
    service.searchQuery$.subscribe(query => {
      expect(query).toBe('');
      done();
    });
  });

  it('should update the search query', (done) => {
    const newQuery = 'test query';
    service.updateSearchQuery(newQuery);
    service.searchQuery$.subscribe(query => {
      expect(query).toBe(newQuery);
      done();
    });
  });
});
