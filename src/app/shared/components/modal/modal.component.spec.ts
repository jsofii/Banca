import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ProductService } from '../../../features/product/services/product.service';
import { RefreshService } from '../../../core/services/refresh.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let refreshServiceSpy: jasmine.SpyObj<RefreshService>;

  beforeEach(async () => {
    const productSpy = jasmine.createSpyObj('ProductService', ['deleteProductById']);
    const refreshSpy = jasmine.createSpyObj('RefreshService', ['triggerRefresh']);

    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        { provide: ProductService, useValue: productSpy },
        { provide: RefreshService, useValue: refreshSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    refreshServiceSpy = TestBed.inject(RefreshService) as jasmine.SpyObj<RefreshService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    const modalElement = document.createElement('div');
    modalElement.id = 'deleteModal';
    document.body.appendChild(modalElement);

    component.openModal('123');
    expect(component.productId).toBe('123');
    expect(modalElement.classList).toContain('show');

    document.body.removeChild(modalElement);
  });

  it('should close modal', () => {
    const modalElement = document.createElement('div');
    modalElement.id = 'deleteModal';
    document.body.appendChild(modalElement);

    component.closeModal();
    expect(modalElement.classList).not.toContain('show');

    document.body.removeChild(modalElement);
  });

  it('should confirm delete and handle success', () => {
    productServiceSpy.deleteProductById.and.returnValue(of({}));
    spyOn(component, 'closeModal');

    component.confirmDelete();
    expect(productServiceSpy.deleteProductById).toHaveBeenCalledWith(component.productId);
    expect(refreshServiceSpy.triggerRefresh).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should confirm delete and handle error', () => {
    const errorResponse = new HttpErrorResponse({ error: 'test 404 error', status: 404 });
    productServiceSpy.deleteProductById.and.returnValue(throwError(() => errorResponse));

    component.confirmDelete();
    expect(productServiceSpy.deleteProductById).toHaveBeenCalledWith(component.productId);
    expect(component.errorMessage).toBe('An error occurred while deleting the product. Please try again later.');
  });
});
