import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ProductComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: of({}),
            url: '/product/list',
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize showSearchAndButton to true', () => {
    expect(component.showSearchAndButton).toBeTrue();
  });


  it('should navigate to create route on onAction call', () => {
    component.onAction();
    expect(router.navigate).toHaveBeenCalledWith(['/product/create']);
  });
});
