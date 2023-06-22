import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(public readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.findAll();
  }

  ngOnDestroy(): void {
    this.userService.destroy();
  }
}
