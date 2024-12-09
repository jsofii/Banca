import { Component } from '@angular/core';
import {SearchInputComponent} from '../../../../shared/components/search-input/search-input.component';
import {ProductListComponent} from '../../components/product-list/product-list.component';
import {ButtonComponent} from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-product',
  imports: [SearchInputComponent, ProductListComponent, ButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
