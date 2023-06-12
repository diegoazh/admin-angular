import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiService, ToastService } from '../../../shared/services';
import { UserModel } from '../../../models';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  public user?: UserModel;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly apiService: ApiService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.user = this.dialogConfig.data?.user;
  }

  public confirm() {
    if (this.user) {
      this.apiService.users.remove(this.user.id).subscribe({
        next: () => {
          this.toastService.send({
            detail: $localize`The user was deleted successfully`,
            severity: 'success',
          });

          this.dialogRef.close(this.user);
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            detail: $localize`The user can not be deleted`,
            severity: 'error',
          });

          this.dialogRef.close();
        },
      });
    } else {
      this.toastService.send({
        detail: $localize`The user to delete is not defined`,
        severity: 'info',
      });
    }
  }

  public cancel() {
    this.dialogRef.close();
  }
}
