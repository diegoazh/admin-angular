import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IKeycloakCreateUserData } from '../../../shared/interfaces';
import { ApiService, ToastService } from '../../../shared/services';
import { equalValidator } from '../../../shared/validators';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss'],
})
export class CreateUserFormComponent implements OnInit {
  public user: IKeycloakCreateUserData = {
    email: '',
    password: '',
    emailVerified: false,
    enabled: false,
    firstName: '',
    groups: [],
    lastName: '',
    requiredActions: [],
    username: '',
  };

  public userForm: FormGroup = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(32)],
    ],
    email: ['', [Validators.required, Validators.email]],
    firstName: [''],
    lastName: [''],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(32)],
    ],
    confirmPassword: ['', [Validators.required, equalValidator('password')]],
  });

  public showPass = false;

  public isUpdate = false;

  public buttonLabel = $localize`Create`;

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  get isFormInvalid() {
    return this.userForm.status === 'INVALID';
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
      this.userForm.removeControl('password');
      this.userForm.removeControl('confirmPassword');
    }

    if (this.dialogConfig.data?.user) {
      this.userForm
        ?.get('username')
        ?.setValue(this.dialogConfig.data?.user?.username);
      this.userForm
        ?.get('email')
        ?.setValue(this.dialogConfig.data?.user?.email);
      this.userForm
        ?.get('firstName')
        ?.setValue(this.dialogConfig.data?.user?.firstName);
      this.userForm
        ?.get('lastName')
        ?.setValue(this.dialogConfig.data?.user?.lastName);
    }
  }

  public submit(): void {
    this.user.email = this.userForm.get('email')?.value || '';
    this.user.username = this.userForm.get('username')?.value || '';
    this.user.firstName = this.userForm.get('firstName')?.value || '';
    this.user.lastName = this.userForm.get('lastName')?.value || '';
    this.user.password = this.userForm.get('password')?.value || '';

    if (!this.isUpdate) {
      this.apiService.users.create(this.user).subscribe({
        next: (user) => {
          this.toastService.send({
            severity: 'success',
            detail: $localize`User was created successfully`,
          });

          this.dialogRef.close(user);
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            severity: 'error',
            detail: $localize`The user can't be created`,
          });
        },
      });
    } else {
      const id = this.dialogConfig.data?.user?.id;
      const data = { ...this.dialogConfig.data?.user, ...this.user };
      this.apiService.users.overwrite(id, data).subscribe({
        next: (user) => {
          this.toastService.send({
            severity: 'success',
            detail: $localize`User was updated successfully`,
          });

          this.dialogRef.close(user);
        },
        error: (error: unknown) => {
          console.error(error);
          this.toastService.send({
            severity: 'error',
            detail: $localize`The user can't be updated`,
          });
        },
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public showPassword(): void {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.userForm.removeControl('confirmPassword');
    } else {
      this.userForm.addControl(
        'confirmPassword',
        new FormControl('', [Validators.required, equalValidator('password')]),
      );
    }
  }
}
