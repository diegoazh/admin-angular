import { Injectable } from '@angular/core';
import { CategoryModel } from '../../models';
import { ApiService } from '../../shared/services';
import { TableCrudService } from '../../standalone/table-crud/table-crud.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends TableCrudService<CategoryModel> {
  constructor(private readonly apiService: ApiService) {
    super();
  }

  public findAll() {
    this.apiService.categories.find$().subscribe({
      next: (categories) => {
        this.items = categories;
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }
}
