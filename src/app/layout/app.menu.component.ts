import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: MenuItem[] = [];

  constructor(public readonly layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: $localize`Home`,
        items: [
          {
            label: $localize`Dashboard`,
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: $localize`Actions`,
        items: [
          {
            label: $localize`Articles`,
            icon: 'pi pi-book',
            routerLink: ['/app/articles'],
          },
          {
            label: $localize`Categories`,
            icon: 'pi pi-list',
            routerLink: ['/app/categories'],
          },
          {
            label: $localize`Tags`,
            icon: 'pi pi-tags',
            routerLink: ['/app/tags'],
          },
          {
            label: $localize`Users`,
            icon: 'pi pi-users',
            routerLink: ['/app/users'],
          },
        ],
      },
    ];
  }
}
