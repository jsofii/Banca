import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../model/Product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new product', () => {
    const newProduct: Product = { id: '1', name: 'Test Product', description: 'Test Description', logo: 'test-logo.png', date_release: '2023-01-01', date_revision: '2024-01-01' };

    service.createProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update an existing product', () => {
    const updatedProduct: Product = { id: '1', name: 'Updated Product', description: 'Updated Description', logo: 'updated-logo.png', date_release: '2023-01-01', date_revision: '2024-01-01' };

    service.updateProduct('1', updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should return a product by ID', () => {
    const product: Product = { id: '1', name: 'Test Product', description: 'Test Description', logo: 'test-logo.png', date_release: '2023-01-01', date_revision: '2024-01-01' };

    service.getProductById('1').subscribe(returnedProduct => {
      expect(returnedProduct).toEqual(product);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(product);
  });


});
