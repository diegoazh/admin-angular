import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../standalone/not-found/not-found.component';
import { NotImplementedComponent } from '../standalone/not-implemented/not-implemented.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/not-found',
        pathMatch: 'full',
      },
      {
        path: 'articles',
        component: PostsComponent,
        data: { breadcrumbs: $localize`articles` },
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        data: { breadcrumbs: $localize`categories` },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { breadcrumbs: $localize`users` },
      },
      { path: 'not-implemented', component: NotImplementedComponent },
      { path: 'not-found', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
