import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() display = false;

  @Output() displayChange = new EventEmitter<boolean>();

  public toggle(): void {
    this.displayChange.emit(!this.display);
  }
}
