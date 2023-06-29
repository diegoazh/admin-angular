import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryModel } from '../../../models';
import { CategoryService } from '../../../pages/categories/category.service';
import { CreateCategoryFormComponent } from '../create-category-form/create-category-form.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() categories: CategoryModel[] = [];

  public formRef?: DynamicDialogRef;

  constructor(
    private readonly dialogService: DialogService,
    private readonly categoryService: CategoryService,
  ) {}

  public createTag = (): void => {
    this.formRef = this.dialogService.open(CreateCategoryFormComponent, {
      header: $localize`Create new category`,
      styleClass: 'w-1/3',
    });

    this.formRef.onClose.subscribe({
      next: (category) => {
        this.categoryService.addOrRemoveItem({ item: category });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };

  public editTag = (category: CategoryModel): void => {
    this.formRef = this.dialogService.open(CreateCategoryFormComponent, {
      header: $localize`Update category`,
      styleClass: 'w-1/3',
      data: {
        category: category,
        isUpdate: true,
      },
    });

    this.formRef.onClose.subscribe({
      next: (category) => {
        this.categoryService.addOrRemoveItem({
          item: category,
          overwrite: true,
        });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };

  public deleteTag = (category: CategoryModel): void => {
    this.formRef = this.dialogService.open(DeleteCategoryComponent, {
      header: $localize`Delete category`,
      styleClass: 'w-1/3',
      data: {
        category: category,
      },
    });

    this.formRef.onClose.subscribe({
      next: (category) => {
        this.categoryService.addOrRemoveItem({ item: category });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };
}
