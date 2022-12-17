import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    NotFoundComponent,
    NotImplementedComponent,
  ],
  imports: [CommonModule],
  exports: [MainLayoutComponent, NotFoundComponent, NotImplementedComponent],
})
export class SharedModule {}
