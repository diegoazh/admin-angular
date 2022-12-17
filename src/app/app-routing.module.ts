import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MainLayoutComponent,
      },
      { path: 'not-found', component: NotFoundComponent },
    ],
  },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', redirectTo: '/app/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
