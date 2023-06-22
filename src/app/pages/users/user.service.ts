import { Injectable } from '@angular/core';
import { UserModel } from '../../models';
import { ApiService } from '../../shared/services';
import { TableCrudService } from '../../standalone/table-crud/table-crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends TableCrudService<UserModel> {
  constructor(private readonly apiService: ApiService) {
    super();
  }

  public findAll() {
    this.apiService.users.find$().subscribe({
      next: (users) => {
        this.items = users;
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }
}
