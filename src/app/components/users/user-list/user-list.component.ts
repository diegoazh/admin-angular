import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { UserModel } from '../../../models';
import { UserService } from '../../../pages/users/user.service';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users: UserModel[] = [];

  public formRef?: DynamicDialogRef;

  constructor(
    private readonly userService: UserService,
    private readonly dialogService: DialogService,
  ) {}

  public createUser = (): void => {
    this.formRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Create new user`,
      styleClass: 'w-1/3',
    });

    this.formRef.onClose.subscribe({
      next: (user) => {
        this.userService.addOrRemoveItem({ item: user });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };

  public editUser = (user: UserModel): void => {
    this.formRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Update user`,
      styleClass: 'w-1/3',
      data: {
        user,
        isUpdate: true,
      },
    });

    this.formRef.onClose.subscribe({
      next: (user) => {
        this.userService.addOrRemoveItem({ item: user, overwrite: true });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };

  public deleteUser = (user: UserModel): void => {
    this.formRef = this.dialogService.open(DeleteUserComponent, {
      header: $localize`Delete user: ${user.email}`,
      styleClass: 'w-1/3',
      data: {
        user,
      },
    });

    this.formRef.onClose.subscribe({
      next: (user) => {
        this.userService.addOrRemoveItem({ item: user });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };

  public searchOnTable(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
