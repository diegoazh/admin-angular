import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { UserModel } from '../../../models';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

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

  public createUser(): void {
    this.formRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Create new user`,
      styleClass: 'w-1/3',
    });

    this.formRef.onClose.subscribe({
      next: (user: UserModel) => {
        this.users.push(user);
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }

  public deleteSelectedUsers(): void {
    this.selectedUsers.forEach((user) => this.deleteUser(user));
  }

  public editUser(user: UserModel): void {
    this.formRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Update user`,
      styleClass: 'w-1/3',
      data: {
        user,
        isUpdate: true,
      },
    });

    this.formRef.onClose.subscribe({
      next: (user?: UserModel) => {
        if (user) {
          this.addOrRemoveUser(user, true);
        }
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }

  public deleteUser(user: UserModel): void {
    this.formRef = this.dialogService.open(DeleteUserComponent, {
      header: $localize`Delete user: ${user.email}`,
      styleClass: 'w-1/3',
      data: {
        user,
      },
    });

    this.formRef.onClose.subscribe({
      next: (user?: UserModel) => {
        if (user) {
          this.addOrRemoveUser(user);
        }
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }

  public searchOnTable(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public defineYesOrNo(value: boolean): string {
    return value ? $localize`Yes` : $localize`No`;
  }

  private addOrRemoveUser(user: UserModel, add = false): void {
    const index = this.users.findIndex((value) => value.id === user?.id);

    if (index >= 0) {
      add ? this.users.splice(index, 1, user) : this.users.splice(index, 1);
    }
  }
}
