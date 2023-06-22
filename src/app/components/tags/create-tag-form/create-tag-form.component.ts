import { Component, OnInit } from '@angular/core';
import { TagModel } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService, ToastService } from '../../../shared/services';

@Component({
  selector: 'app-create-tag-form',
  templateUrl: './create-tag-form.component.html',
  styleUrls: ['./create-tag-form.component.scss'],
})
export class CreateTagFormComponent implements OnInit {
  public tag: TagModel = {
    id: '',
    name: '',
    posts: [],
    createdAt: '',
    updatedAt: '',
  };

  public tagForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
    ],
  });

  public isUpdate = false;

  public buttonLabel = $localize`Create`;

  get name() {
    return this.tagForm.get('name');
  }

  get isFormInvalid() {
    return this.tagForm.status === 'INVALID';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly apiService: ApiService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.isUpdate = !!this.dialogConfig.data?.isUpdate;

    if (this.isUpdate) {
      this.buttonLabel = $localize`Update`;
    }

    if (this.dialogConfig.data?.tag) {
      this.tagForm?.get('name')?.setValue(this.dialogConfig.data?.tag?.name);
    }
  }

  public submit(): void {
    this.tag.name = this.tagForm.get('name')?.value || '';

    if (!this.isUpdate) {
      this.apiService.tags.create$(this.tag).subscribe({
        next: (tag) => {
          this.toastService.send({
            severity: 'success',
            detail: $localize`The tag was created successfully`,
          });

          this.dialogRef.close(tag);
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            severity: 'error',
            detail: $localize`The tag can't be created`,
          });
        },
      });
    } else {
      const id = this.dialogConfig.data?.tag?.id;
      const data = { ...this.dialogConfig.data?.tag, ...this.tag };
      this.apiService.tags.overwrite$(id, data).subscribe({
        next: (tag) => {
          this.toastService.send({
            severity: 'success',
            detail: $localize`The tag was updated successfully`,
          });

          this.dialogRef.close(tag);
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            severity: 'error',
            detail: $localize`The tag can't be updated`,
          });
        },
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
