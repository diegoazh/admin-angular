import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApiService, SubscriptionsService } from '../../shared/services';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit, OnDestroy {
  public items: MenuItem[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly subsService: SubscriptionsService,
  ) {}

  ngOnInit(): void {
    const sub = this.apiService.users.count().subscribe({
      next: (count) => {
        this.items = [
          { label: 'users', icon: 'pi pi-users', badge: `${count}` },
        ];
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });

    this.subsService.add(MainMenuComponent.name, sub);
  }

  ngOnDestroy(): void {
    this.subsService.unsubscribe(MainMenuComponent.name);
  }
}
