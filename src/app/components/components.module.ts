import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateUserFormComponent } from './users/create-user-form/create-user-form.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { UsersListComponent } from './users/user-list/users-list.component';
import {
  TableCrudComponent,
  TableCrudTemplateDirective,
} from '../standalone/table-crud/table-crud.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    UsersListComponent,
    CreateUserFormComponent,
    DeleteUserComponent,
  ],
  imports: [
    SharedModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    SidebarModule,
    SelectButtonModule,
    CardModule,
    TableModule,
    ToolbarModule,
    TagModule,
    DynamicDialogModule,
    FieldsetModule,
    TableCrudComponent,
    TableCrudTemplateDirective,
  ],
  providers: [
    MessageService,
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
  exports: [AuthenticationComponent, UsersListComponent],
})
export class ComponentsModule {}