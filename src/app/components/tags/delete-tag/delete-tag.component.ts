import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiService, ToastService } from '../../../shared/services';
import { TagModel } from '../../../models';

@Component({
  selector: 'app-delete-tag',
  templateUrl: './delete-tag.component.html',
  styleUrls: ['./delete-tag.component.scss'],
})
export class DeleteTagComponent implements OnInit {
  public tag?: TagModel;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly apiService: ApiService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.tag = this.dialogConfig.data?.tag;
  }

  public confirm() {
    if (this.tag) {
      this.apiService.tags.remove$(this.tag.id).subscribe({
        next: () => {
          this.toastService.send({
            detail: $localize`The tag was deleted successfully`,
            severity: 'success',
          });

          this.dialogRef.close({ ...this.tag });
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            detail: $localize`The tag can't be deleted`,
            severity: 'error',
          });

          this.dialogRef.close();
        },
      });
    } else {
      this.toastService.send({
        detail: $localize`The tag to delete is not defined`,
        severity: 'info',
      });

      this.dialogRef.close();
    }
  }

  public cancel() {
    this.dialogRef.close();
  }
}
