import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleTemplateComponent } from './pages/exempleTemplate/exempleTemplate.component';
import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import {AuthGuardService} from "./core/services/auth-guard.service";


const routes: Routes = [
  { path: '', component: ExempleTemplateComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'documentation', component: ExempleDocComponent, canActivate: [AuthGuardService]},
  { path: 'not-found', component: Error404Component, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'not-found', canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
