import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { UserModel } from '../../../models';
import { ICrudServices } from '../../../shared/interfaces';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { SubscriptionsService } from '../../../shared/services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() service!: ICrudServices<UserModel>;

  public formRef?: DynamicDialogRef;

  public users: UserModel[] = [];

  constructor(
    private readonly dialogService: DialogService,
    private readonly subscriptionsSvc: SubscriptionsService,
  ) {}

  ngOnInit(): void {
    this.subscriptionsSvc.add(
      UserListComponent.name,
      this.service.items$.subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error: unknown) => {
          console.error(error);
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptionsSvc.unsubscribe(UserListComponent.name);
  }

  public createUser = (): void => {
    this.formRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Create new user`,
      styleClass: 'w-1/3',
    });

    this.formRef.onClose.subscribe({
      next: (user) => {
        this.service.addOrRemoveItem({ item: user });
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
        this.service.addOrRemoveItem({ item: user, overwrite: true });
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
        this.service.addOrRemoveItem({ item: user });
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
