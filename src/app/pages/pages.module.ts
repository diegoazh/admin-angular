import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { PageRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [SharedModule, ComponentsModule, PageRoutingModule],
  exports: [],
})
export class PagesModule {}
