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
import { ListEtudiantsComponent } from './pages/user/list-etudiants/list-etudiants.component';

// import stages
import { ListStagesComponent } from './pages/stage/list-stages/list-stages.component';
import { InfoStageComponent } from './pages/stage/info-stage/info-stage.component';
import { AddStageComponent } from './pages/stage/add-stage/add-stage.component';

// import entreprise
import { ListEntreprisesComponent } from './pages/entreprise/list-entreprises/list-entreprises.component';
import { InfoEntrepriseComponent } from './pages/entreprise/info-entreprise/info-entreprise.component';

// import soutenance
import { ListSoutenancesComponent } from './pages/soutenance/list-soutenances/list-soutenances.component';
import { AddSoutenanceComponent } from './pages/soutenance/add-soutenance/add-soutenance.component';

// import parcours
import { ListParcoursComponent } from './pages/parcours/list-parcours/list-parcours.component';
import { InfoParcoursComponent } from './pages/parcours/info-parcours/info-parcours.component';

// import config
import { ConfigCalendrierSoutenancesComponent } from './pages/soutenance/config-calendrier-soutenances/config-calendrier-soutenances.component';

//import login
import { LoginComponent } from './pages/login/login.component';


// Importation des guards
import {AuthGuardService} from "./core/guards/auth-guard.service";
import {AuthGuard} from "./core/guards/guard-login.service";
import { RouteGuard } from "./core/guards/route.guard";

// Importation des resolver
import { AllUsersResolver } from "./core/resolves/all-users.resolver";
import { UserResolver } from "./core/resolves/user.resolver";
import { AllStagesResolver } from "./core/resolves/all-stages.resolver";
import { StageResolver } from "./core/resolves/stage.resolver";
import { AllEntreprisesResolver } from './core/resolves/all-entreprises.resolver';
import { EntrepriseResolver } from './core/resolves/entreprise.resolver';
import { AllParcoursResolver } from './core/resolves/all-parcours.resolver';
import { ParcoursResolver } from './core/resolves/parcours.resolver';
import { AllSoutenancesResolver } from './core/resolves/all-soutenances.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'liste-stages', pathMatch: 'full', canActivate: [AuthGuardService, RouteGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'documentation', component: ExempleDocComponent, canActivate: [AuthGuardService, RouteGuard]},

  // routes stages
  { path: 'liste-stages', 
      component: ListStagesComponent, 
      canActivate: [AuthGuardService, RouteGuard],
      resolve: {
        allStages: AllStagesResolver  // on associe un resolver à la route
      }
  },
  { path: 'liste-stages/:id', 
      component: InfoStageComponent, 
      canActivate: [AuthGuardService, RouteGuard],
      resolve: {
        stage: StageResolver  // on associe un resolver à la route
      }
  },

  { path: 'saisir-stage', component: AddStageComponent, canActivate: [AuthGuardService]},

  // route users
  
  { path: 'liste-utilisateurs', component: ListUsersComponent, canActivate: [AuthGuardService, RouteGuard], resolve: { users: AllUsersResolver }},
  { path: 'liste-etudiants', component: ListEtudiantsComponent, canActivate: [AuthGuardService, RouteGuard], resolve: { AllEtudiants: AllUsersResolver }},
  { path: 'liste-utilisateurs/import-users', component: ImportUsersComponent, canActivate: [AuthGuardService, RouteGuard]},
  { path: 'liste-utilisateurs/add-user', component: AddUserComponent, canActivate: [AuthGuardService, RouteGuard]},
  { path: 'liste-utilisateurs/edit-user/:id', 
      component: EditUserComponent, 
      canActivate: [AuthGuardService, RouteGuard],
      resolve: {
        user: UserResolver  // on associe un resolver à la route
      }
    },
  { path: 'liste-utilisateurs/edit-user-v2', component: EditUserV2Component, canActivate: [AuthGuardService, RouteGuard]},
  { path: 'liste-utilisateurs/user/:id', 
      component: InfoUserComponent, 
      canActivate: [AuthGuardService, RouteGuard],
      resolve: {
        user: UserResolver  // on associe un resolver à la route
      },
  },
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuardService, RouteGuard]},

  //routes entreprise
  { path: 'liste-entreprises', component: ListEntreprisesComponent, canActivate: [AuthGuardService, RouteGuard], resolve: { entreprises: AllEntreprisesResolver }},
  { path: 'liste-entreprises/:id', component: InfoEntrepriseComponent, canActivate: [AuthGuardService, RouteGuard], resolve: { entreprise: EntrepriseResolver }},
  
  // route soutenance
  { path: 'liste-soutenances', component: ListSoutenancesComponent, canActivate: [AuthGuardService, RouteGuard], resolve: { soutenances: AllSoutenancesResolver }},
  { path: 'liste-soutenances/add-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RouteGuard]},
  { path: 'liste-soutenances/edit-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RouteGuard]},
  { path: 'liste-soutenances/soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RouteGuard]},

  // route parcours
  { path: 'liste-parcours', component: ListParcoursComponent, canActivate: [AuthGuardService, RouteGuard], resolve: { allParcours: AllParcoursResolver }},
  { path: 'liste-parcours/:id', component: InfoParcoursComponent, canActivate: [AuthGuardService, RouteGuard], resolve: { parcours: ParcoursResolver }},

  // config calendrier soutenance
  { path: 'configuration-calendrier-soutenances', component: ConfigCalendrierSoutenancesComponent, canActivate: [AuthGuardService, RouteGuard]},

  { path: 'not-found', component: Error404Component, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'not-found', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
