import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleTemplateComponent } from './pages/exempleTemplate/exempleTemplate.component';
import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { InfoUserComponent } from './pages/user/info-user/info-user.component';

const routes: Routes = [
  { path: '', component: ExempleTemplateComponent},
  { path: 'documentation', component: ExempleDocComponent},
  { path: 'profile', component: ProfileUserComponent},
  { path: 'user', component: InfoUserComponent},
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
