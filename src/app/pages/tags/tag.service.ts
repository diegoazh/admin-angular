import { Injectable } from '@angular/core';
import { TagModel } from '../../models';
import { ApiService } from '../../shared/services';
import { TableCrudService } from '../../standalone/table-crud/table-crud.service';

@Injectable({
  providedIn: 'root',
})
export class TagService extends TableCrudService<TagModel> {
  constructor(private readonly apiService: ApiService) {
    super();
  }

  public findAll() {
    this.apiService.tags.find$().subscribe({
      next: (tags) => {
        this.items = tags;
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }
}
