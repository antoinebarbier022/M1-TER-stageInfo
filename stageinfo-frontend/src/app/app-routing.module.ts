import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleTemplateComponent } from './pages/exempleTemplate/exempleTemplate.component';
import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ExempleTemplateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'documentation', component: ExempleDocComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: Error404Component, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'not-found', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
