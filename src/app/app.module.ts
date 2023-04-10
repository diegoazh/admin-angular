import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LayoutsModule } from './layouts/layout.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [AppComponent],
  imports: [
    OAuthModule.forRoot(),
    BrowserModule,
    RippleModule,
    SharedModule,
    LayoutsModule,
    ComponentsModule,
    PagesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
