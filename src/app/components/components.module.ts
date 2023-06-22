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
import {
  TableCrudComponent,
  TableCrudTemplateDirective,
} from '../standalone/table-crud/table-crud.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateTagFormComponent } from './tags/create-tag-form/create-tag-form.component';
import { DeleteTagComponent } from './tags/delete-tag/delete-tag.component';
import { TagListComponent } from './tags/tag-list/tag-list.component';
import { CreateUserFormComponent } from './users/create-user-form/create-user-form.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { UserListComponent } from './users/user-list/user-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    UserListComponent,
    CreateUserFormComponent,
    DeleteUserComponent,
    TagListComponent,
    CreateTagFormComponent,
    DeleteTagComponent,
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
  exports: [AuthenticationComponent, UserListComponent, TagListComponent],
})
export class ComponentsModule {}
