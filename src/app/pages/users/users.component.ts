import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models';
import { ApiService } from '../../shared/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: UserModel[] = [];

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.users.count().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
    this.apiService.users.find().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }
}
