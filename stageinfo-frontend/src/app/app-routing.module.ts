import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleTemplateComponent } from './pages/exempleTemplate/exempleTemplate.component';
import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { InfoUserComponent } from './pages/user/info-user/info-user.component';
import { ListUsersComponent } from './pages/user/list-users/list-users.component';
import { ListStagesComponent } from './pages/stage/list-stages/list-stages.component';
import { LoginComponent } from './pages/login/login.component';

//import {AuthGuardService} from "./core/services/auth-guard.service";


const routes: Routes = [
  { path: '', component: ExempleTemplateComponent, canActivate: []},
  { path: 'login', component: LoginComponent},
  { path: 'documentation', component: ExempleDocComponent, canActivate: []},
  { path: 'list-stage', component: ListStagesComponent, canActivate: []},
  { path: 'profile', component: ProfileUserComponent, canActivate: []},
  { path: 'liste-utilisateurs/user', component: InfoUserComponent, canActivate: []},
  { path: 'liste-utilisateurs', component: ListUsersComponent, canActivate: []},
  { path: 'not-found', component: Error404Component, canActivate: []},
  { path: '**', redirectTo: 'not-found', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
