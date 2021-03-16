import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleTemplateComponent } from './pages/exempleTemplate/exempleTemplate.component';
import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/erreurs/error404/error404.component';

// import user
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { InfoUserComponent } from './pages/user/info-user/info-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { EditUserV2Component } from './pages/user/edit-user-v2/edit-user-v2.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { ImportUsersComponent } from './pages/user/import-users/import-users.component';
import { ListUsersComponent } from './pages/user/list-users/list-users.component';

// import stages
import { ListStagesComponent } from './pages/stage/list-stages/list-stages.component';
import { InfoStageComponent } from './pages/stage/info-stage/info-stage.component';
import { AddStageComponent } from './pages/stage/add-stage/add-stage.component';

// import entreprise
import { ListEntreprisesComponent } from './pages/entreprise/list-entreprises/list-entreprises.component';
import { AddEntrepriseComponent } from './pages/entreprise/add-entreprise/add-entreprise.component';
import { EditEntrepriseComponent } from './pages/entreprise/edit-entreprise/edit-entreprise.component';
import { InfoEntrepriseComponent } from './pages/entreprise/info-entreprise/info-entreprise.component';

// import soutenance
import { ListSoutenancesComponent } from './pages/soutenance/list-soutenances/list-soutenances.component';
import { AddSoutenanceComponent } from './pages/soutenance/add-soutenance/add-soutenance.component';

// import config
import { ConfigCalendrierSoutenancesComponent } from './pages/soutenance/config-calendrier-soutenances/config-calendrier-soutenances.component';

//import login
import { LoginComponent } from './pages/login/login.component';

import {AuthGuardService} from "./core/guards/auth-guard.service";
import {AuthGuard} from "./core/guards/guard-login.service";


const routes: Routes = [
  { path: '', component: ListStagesComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'documentation', component: ExempleDocComponent, canActivate: [AuthGuardService]},
  // routes stages
  { path: 'liste-stages', component: ListStagesComponent, canActivate: [AuthGuardService]},
  { path: 'liste-stages/:id', component: InfoStageComponent, canActivate: [AuthGuardService]},
  { path: 'liste-stages', component: ListStagesComponent, canActivate: [AuthGuardService]},
  { path: 'saisir-stage', component: AddStageComponent, canActivate: [AuthGuardService]},

  // route users
  
  { path: 'liste-utilisateurs', component: ListUsersComponent, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/import-users', component: ImportUsersComponent, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/add-user', component: AddUserComponent, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/edit-user/:id', component: EditUserComponent, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/edit-user-v2', component: EditUserV2Component, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/user/:id', component: InfoUserComponent, canActivate: [AuthGuardService]},
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuardService]},
  //routes entreprise
  { path: 'liste-entreprises', component: ListEntreprisesComponent, canActivate: [AuthGuardService]},
  { path: 'liste-entreprises/add-entreprise', component: AddEntrepriseComponent, canActivate: [AuthGuardService]},
  { path: 'liste-entreprises/edit-entreprise', component: EditEntrepriseComponent, canActivate: [AuthGuardService]},
  { path: 'liste-entreprises/entreprise', component: InfoEntrepriseComponent, canActivate: [AuthGuardService]},
  // route soutenance
  { path: 'liste-soutenances', component: ListSoutenancesComponent, canActivate: [AuthGuardService]},
  { path: 'liste-soutenances/add-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService]},
  { path: 'liste-soutenances/edit-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService]},
  { path: 'liste-soutenances/soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService]},

  // config calendrier soutenance
  { path: 'configuration-calendrier-soutenances', component: ConfigCalendrierSoutenancesComponent, canActivate: [AuthGuardService]},



  { path: 'not-found', component: Error404Component, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'not-found', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
