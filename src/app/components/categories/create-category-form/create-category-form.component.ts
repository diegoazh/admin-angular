import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../../models';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiService, ToastService } from '../../../shared/services';

@Component({
  selector: 'app-create-category-form',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.scss'],
})
export class CreateCategoryFormComponent implements OnInit {
  public category: CategoryModel = {
    id: '',
    name: '',
    parentId: '',
    posts: [],
    createdAt: '',
    updatedAt: '',
  };

  public categoryForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
    ],
  });

  public isUpdate = false;

  public buttonLabel = $localize`Create`;

  get name() {
    return this.categoryForm.get('name');
  }

  get isFormInvalid() {
    return this.categoryForm.status === 'INVALID';
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

    if (this.dialogConfig.data?.category) {
      this.category = { ...this.dialogConfig.data?.category };
      this.categoryForm
        ?.get('name')
        ?.setValue(this.dialogConfig.data?.category?.name);
    }
  }

  public submit(): void {
    this.category.name =
      this.categoryForm.get('name')?.value?.toLowerCase() || '';

    if (!this.isUpdate) {
      this.apiService.categories.create$(this.category).subscribe({
        next: (category) => {
          this.toastService.send({
            severity: 'success',
            detail: $localize`The category was created successfully`,
          });

          this.dialogRef.close(category);
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            severity: 'error',
            detail: $localize`The category can't be created`,
          });
        },
      });
    } else {
      const id = this.dialogConfig.data?.category?.id;
      const data = { ...this.dialogConfig.data?.category, ...this.category };
      this.apiService.categories.overwrite$(id, data).subscribe({
        next: (category) => {
          this.toastService.send({
            severity: 'success',
            detail: $localize`The category was updated successfully`,
          });

          this.dialogRef.close(category);
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            severity: 'error',
            detail: $localize`The category can't be updated`,
          });
        },
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
