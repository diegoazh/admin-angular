import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { SubscriptionsManagerService } from '../../shared/services';
import { CategoryModel } from '../../models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: CategoryModel[] = [];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly subsManager: SubscriptionsManagerService,
  ) {}

  ngOnInit(): void {
    this.categoryService.findAll();
    this.subsManager.add(
      CategoriesComponent.name,
      this.categoryService.items$.subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (error: unknown) => {
          console.error(error);
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.categoryService.destroy();
    this.subsManager.unsubscribe(CategoriesComponent.name);
  }
}
