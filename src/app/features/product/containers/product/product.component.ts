import {Component, OnInit} from '@angular/core';
import {SearchInputComponent} from '../../../../shared/components/search-input/search-input.component';
import {ProductListComponent} from '../../components/product-list/product-list.component';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [SearchInputComponent, ButtonComponent, RouterModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit{
  showSearchAndButton: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      console.log('!!!!!!!!!!'+this.router.url+':'+!this.router.url.includes('list'));
      this.showSearchAndButton = this.router.url.includes('list');
    });
  }
  onAction() {
    this.router.navigate(['/product/create']); // Navigate to the create route
  }
}
