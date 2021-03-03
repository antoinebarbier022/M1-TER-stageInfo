import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleTemplateComponent } from './pages/exempleTemplate/exempleTemplate.component';
import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { InfoUserComponent } from './pages/user/info-user/info-user.component';
import { ListUsersComponent } from './pages/user/list-users/list-users.component';
import { ListStagesComponent } from './pages/stage/list-stages/list-stages.component';

const routes: Routes = [
  { path: '', component: ExempleTemplateComponent},
  { path: 'documentation', component: ExempleDocComponent},
  { path: 'list-stage', component: ListStagesComponent},
  { path: 'profile', component: ProfileUserComponent},
  { path: 'list-users/user', component: InfoUserComponent},
  { path: 'list-users', component: ListUsersComponent},
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
