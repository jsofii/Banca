import { Routes } from '@angular/router';
import { ProductComponent } from './features/product/containers/product/product.component';
import { ProductFormComponent } from './features/product/components/product-form/product-form.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'product/edit/:id', component: ProductFormComponent },
      { path: 'product/create', component: ProductFormComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
