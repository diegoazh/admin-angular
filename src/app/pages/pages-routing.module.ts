import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/general/not-found/not-found.component';
import { NotImplementedComponent } from '../components/general/not-implemented/not-implemented.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { UsersComponent } from './users/users.component';

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
