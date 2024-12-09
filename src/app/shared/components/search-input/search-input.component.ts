// src/app/shared/components/search-input/search-input.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';
}
