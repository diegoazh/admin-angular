import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import {
  TableCrudComponent,
  TableCrudTemplateDirective,
} from '../standalone/table-crud/table-crud.component';
import { CategoriesComponent } from './categories/categories.component';
import { PageRoutingModule } from './pages-routing.module';
import { PostsComponent } from './posts/posts.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    UsersComponent,
    PostsComponent,
    CategoriesComponent,
    TagsComponent,
  ],
  imports: [
    SharedModule,
    ComponentsModule,
    PageRoutingModule,
    TableCrudComponent,
    TableCrudTemplateDirective,
  ],
  exports: [],
})
export class PagesModule {}
