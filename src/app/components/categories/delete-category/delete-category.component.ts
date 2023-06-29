import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../../models';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiService, ToastService } from '../../../shared/services';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent implements OnInit {
  public category?: CategoryModel;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly apiService: ApiService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.category = this.dialogConfig.data?.category;
  }

  public confirm() {
    if (this.category) {
      this.apiService.categories.remove$(this.category.id).subscribe({
        next: () => {
          this.toastService.send({
            detail: $localize`The category was deleted successfully`,
            severity: 'success',
          });

          this.dialogRef.close({ ...this.category });
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            detail: $localize`The category can't be deleted`,
            severity: 'error',
          });

          this.dialogRef.close();
        },
      });
    } else {
      this.toastService.send({
        detail: $localize`The category to delete is not defined`,
        severity: 'info',
      });

      this.dialogRef.close();
    }
  }

  public cancel() {
    this.dialogRef.close();
  }
}
