import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { UserModel } from '../../../models';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() users: UserModel[] = [];

  public formRef?: DynamicDialogRef;

  public selectedUsers: UserModel[] = [];

  constructor(private readonly dialogService: DialogService) {}

  public createUser(): Observable<UserModel> {
    this.formRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Create new user`,
      styleClass: 'w-1/3',
    });

    return this.formRef.onClose;
  }

  public deleteSelectedUsers(): void {
    this.selectedUsers.forEach((user) => this.deleteUser(user));
  }

  public editUser(user: UserModel): Observable<UserModel> {
    this.formRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Update user`,
      styleClass: 'w-1/3',
      data: {
        user,
        isUpdate: true,
      },
    });

    return this.formRef.onClose;
  }

  public deleteUser(user: UserModel): Observable<UserModel> {
    this.formRef = this.dialogService.open(DeleteUserComponent, {
      header: $localize`Delete user: ${user.email}`,
      styleClass: 'w-1/3',
      data: {
        user,
      },
    });

    return this.formRef.onClose;
  }

  public searchOnTable(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
