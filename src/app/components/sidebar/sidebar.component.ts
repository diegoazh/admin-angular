import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DarkModeService } from '../../shared/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @Input() display = false;

  @Output() displayChange = new EventEmitter<boolean>();

  public themeModes = [
    { icon: 'pi pi-sun', value: false },
    { icon: 'pi pi-moon', value: true },
    { icon: '', value: undefined },
  ];

  public selectedThemeMode?: {
    icon: 'Light' | 'Dark';
    value?: boolean;
  };

  constructor(private readonly darkModeService: DarkModeService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.darkModeService.checkSystemPreference();
    }, 0);
  }

  public notifyDarkModeChange(event: boolean): void {
    this.darkModeService.emit(event);
  }

  public onHide() {
    this.displayChange.emit(this.display);
  }
}
