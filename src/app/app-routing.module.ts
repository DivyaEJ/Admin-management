import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActiveGuard } from './services/auth-active.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    canLoad:[AuthActiveGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home/home.module').then(m => m.HomeModule),
    canLoad:[AuthActiveGuard]
  },
  { path: '**', redirectTo: 'auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
