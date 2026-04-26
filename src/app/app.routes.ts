


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './features/register/register';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Home }, // page d'accueil
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // REDIRECTION SI L'URL N'EXISTE PAS (Optionnel)
  { path: '**', redirectTo: '/dashboard' }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}