import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { ProductFilterService } from '../../services/product-filter.service';
import { of, BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let filterService: jasmine.SpyObj<ProductFilterService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'handleUpdateAction']);
    const filterServiceSpy = jasmine.createSpyObj('ProductFilterService', ['getFilteredProducts']);

    // Mock the searchQuery$ property to return a BehaviorSubject
    filterServiceSpy.searchQuery$ = new BehaviorSubject<string>('').asObservable();

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ProductFilterService, useValue: filterServiceSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    filterService = TestBed.inject(ProductFilterService) as jasmine.SpyObj<ProductFilterService>;

    // Mock the getProducts method to return an observable
    productService.getProducts.and.returnValue(of({ data: [] }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests here
});
