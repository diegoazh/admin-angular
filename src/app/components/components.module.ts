import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastComponent } from './toast/toast.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    NotImplementedComponent,
    MainMenuComponent,
    BreadcrumbsComponent,
    ToastComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    AuthenticationComponent,
  ],
  imports: [
    SharedModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    BreadcrumbModule,
    ToastModule,
    SidebarModule,
    SelectButtonModule,
    CardModule,
  ],
  providers: [MessageService],
  exports: [
    NotFoundComponent,
    NotImplementedComponent,
    MainMenuComponent,
    BreadcrumbsComponent,
    ToastComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AuthenticationComponent,
  ],
})
export class ComponentsModule {}
