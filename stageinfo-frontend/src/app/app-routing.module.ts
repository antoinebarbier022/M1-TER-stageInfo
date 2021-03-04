import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleTemplateComponent } from './pages/exempleTemplate/exempleTemplate.component';
import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { InfoUserComponent } from './pages/user/info-user/info-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { EditUserV2Component } from './pages/user/edit-user-v2/edit-user-v2.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { ImportUsersComponent } from './pages/user/import-users/import-users.component';
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
  { path: 'liste-utilisateurs/import-users', component: ImportUsersComponent, canActivate: []},
  { path: 'liste-utilisateurs/add-user', component: AddUserComponent, canActivate: []},
  { path: 'liste-utilisateurs/edit-user', component: EditUserComponent, canActivate: []},
  { path: 'liste-utilisateurs/edit-user-v2', component: EditUserV2Component, canActivate: []},
  { path: 'not-found', component: Error404Component, canActivate: []},
  { path: '**', redirectTo: 'not-found', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
