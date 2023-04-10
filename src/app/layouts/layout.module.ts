import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [ComponentsModule, RouterModule],
  exports: [MainLayoutComponent],
})
export class LayoutsModule {}
