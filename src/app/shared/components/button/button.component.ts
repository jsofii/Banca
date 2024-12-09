// src/app/shared/components/button/button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true
})
export class ButtonComponent {
  @Input() label: string = 'Click me';
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
