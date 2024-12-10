import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/product/containers/product/product.component').then(m => m.ProductComponent),
    children: [
      { path: 'list', loadComponent: () => import('./features/product/components/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'product/edit/:id', loadComponent: () => import('./features/product/components/product-form/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'product/create', loadComponent: () => import('./features/product/components/product-form/product-form.component').then(m => m.ProductFormComponent) },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
