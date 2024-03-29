import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { SubscriptionsManagerService } from '../../shared/services';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  imports: [BreadcrumbModule],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  breadcrumb: MenuItem[] = [];
  home: MenuItem = {};

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subsManager: SubscriptionsManagerService,
  ) {}

  ngOnInit() {
    this.home = {
      icon: 'pi pi-home',
      routerLink: ['/app/companies'],
      command: () => {
        (
          document.getElementsByClassName('pi-chevron-down')[0] as HTMLElement
        )?.click();
      },
    };
    this.breadcrumb = this.createBreadcrumbs(this.activatedRoute.root);
    const sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.breadcrumb = this.createBreadcrumbs(this.activatedRoute.root)),
      );
    this.subsManager.add(BreadcrumbsComponent.name, sub);
  }

  ngOnDestroy(): void {
    this.subsManager.unsubscribe(BreadcrumbsComponent.name);
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: MenuItem[] = [],
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length) {
      for (const child of children) {
        const routeURL: string = child.snapshot.url
          .map((segment) => segment.path)
          .join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }

        const label =
          child.snapshot.data[BreadcrumbsComponent.ROUTE_DATA_BREADCRUMB];
        if (label != null) {
          breadcrumbs.push({ label, routerLink: url });
        }

        return this.createBreadcrumbs(child, url, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
