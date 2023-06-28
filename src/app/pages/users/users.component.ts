import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserModel } from '../../models';
import { SubscriptionsManagerService } from '../../shared/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: UserModel[] = [];

  constructor(
    public readonly userService: UserService,
    private readonly subsManager: SubscriptionsManagerService,
  ) {}

  ngOnInit(): void {
    this.userService.findAll();
    this.subsManager.add(
      UsersComponent.name,
      this.userService.items$.subscribe({
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
    this.userService.destroy();
    this.subsManager.unsubscribe(UsersComponent.name);
  }
}
