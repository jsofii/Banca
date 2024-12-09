import {Routes} from '@angular/router';
import {ProductComponent} from './features/product/containers/product/product.component';
import {ProductFormComponent} from './features/product/components/product-form/product-form.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'products', component: ProductComponent},
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {path: 'product/edit', component: ProductFormComponent},
    ],
  },
];
