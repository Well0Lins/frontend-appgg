import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-search',
  standalone: true,
  imports: [],
  templateUrl: './btn-search.component.html',
  styleUrl: './btn-search.component.scss'
})
export class BtnSearchComponent {
 
  @Output() searchEvent = new EventEmitter<void>();

  onSearch() {
    this.searchEvent.emit();
  }
}
