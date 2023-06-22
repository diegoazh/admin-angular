import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { PagesModule } from './pages/pages.module';
import { UnauthorizedInterceptor } from './shared/interceptors/unauthorized.interceptor';
import { SharedModule } from './shared/shared.module';
import { ToastComponent } from './standalone/toast/toast.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.api.url],
        sendAccessToken: true,
      },
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RippleModule,
    SharedModule,
    AppLayoutModule,
    ComponentsModule,
    PagesModule,
    AppRoutingModule,
    ToastComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
