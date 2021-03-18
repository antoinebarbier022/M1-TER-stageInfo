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
import { AddEntrepriseComponent } from './pages/entreprise/add-entreprise/add-entreprise.component';
import { EditEntrepriseComponent } from './pages/entreprise/edit-entreprise/edit-entreprise.component';
import { InfoEntrepriseComponent } from './pages/entreprise/info-entreprise/info-entreprise.component';

// import soutenance
import { ListSoutenancesComponent } from './pages/soutenance/list-soutenances/list-soutenances.component';
import { AddSoutenanceComponent } from './pages/soutenance/add-soutenance/add-soutenance.component';

// import parcours
import { ListParcoursComponent } from './pages/parcours/list-parcours/list-parcours.component';
import { AddParcoursComponent } from './pages/parcours/add-parcours/add-parcours.component';
import { EditParcoursComponent } from './pages/parcours/edit-parcours/edit-parcours.component';
import { InfoParcoursComponent } from './pages/parcours/info-parcours/info-parcours.component';


// import config
import { ConfigCalendrierSoutenancesComponent } from './pages/soutenance/config-calendrier-soutenances/config-calendrier-soutenances.component';

//import login
import { LoginComponent } from './pages/login/login.component';


// Importation des guards
import {AuthGuardService} from "./core/guards/auth-guard.service";
import {AuthGuard} from "./core/guards/guard-login.service";

// Importation des resolver
import { AllUsersResolver } from "./core/resolves/all-users.resolver";
import { UserResolver } from "./core/resolves/user.resolver";
import { AllStagesResolver } from "./core/resolves/all-stages.resolver";
import { StageResolver } from "./core/resolves/stage.resolver";
import { AllEntreprisesResolver } from './core/resolves/all-entreprises.resolver';
import { EntrepriseResolver } from './core/resolves/entreprise.resolver';
import { AllParcoursResolver } from './core/resolves/all-parcours.resolver';
import { ParcoursResolver } from './core/resolves/parcours.resolver';



const routes: Routes = [
  { path: '', redirectTo: 'liste-stages', pathMatch: 'full', canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'documentation', component: ExempleDocComponent, canActivate: [AuthGuardService]},

  // routes stages
  { path: 'liste-stages', 
      component: ListStagesComponent, 
      canActivate: [AuthGuardService],
      resolve: {
        stages: AllStagesResolver  // on associe un resolver à la route
      }
  },
  { path: 'liste-stages/:id', 
      component: InfoStageComponent, 
      canActivate: [AuthGuardService],
      resolve: {
        stage: StageResolver  // on associe un resolver à la route
      }
  },
  { path: 'liste-stages', component: ListStagesComponent, canActivate: [AuthGuardService]},
  { path: 'saisir-stage', component: AddStageComponent, canActivate: [AuthGuardService]},

  // route users
  
  { path: 'liste-utilisateurs', component: ListUsersComponent, canActivate: [AuthGuardService], resolve: { users: AllUsersResolver }},
  { path: 'liste-etudiants', component: ListEtudiantsComponent, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/import-users', component: ImportUsersComponent, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/add-user', component: AddUserComponent, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/edit-user/:id', 
      component: EditUserComponent, 
      canActivate: [AuthGuardService],
      resolve: {
        user: UserResolver  // on associe un resolver à la route
      }
    },
  { path: 'liste-utilisateurs/edit-user-v2', component: EditUserV2Component, canActivate: [AuthGuardService]},
  { path: 'liste-utilisateurs/user/:id', 
      component: InfoUserComponent, 
      canActivate: [AuthGuardService],
      resolve: {
        user: UserResolver  // on associe un resolver à la route
      },
  },
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuardService]},

  //routes entreprise
  { path: 'liste-entreprises', component: ListEntreprisesComponent, canActivate: [AuthGuardService], resolve: { entreprises: AllEntreprisesResolver }},
  { path: 'liste-entreprises/add-entreprise', component: AddEntrepriseComponent, canActivate: [AuthGuardService]},
  { path: 'liste-entreprises/edit-entreprise/:id', component: EditEntrepriseComponent, canActivate: [AuthGuardService], resolve: { entreprise: EntrepriseResolver }},
  { path: 'liste-entreprises/info/:id', component: InfoEntrepriseComponent, canActivate: [AuthGuardService], resolve: { entreprise: EntrepriseResolver }},
  // route soutenance
  { path: 'liste-soutenances', component: ListSoutenancesComponent, canActivate: [AuthGuardService]},
  { path: 'liste-soutenances/add-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService]},
  { path: 'liste-soutenances/edit-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService]},
  { path: 'liste-soutenances/soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService]},

  // route parcours
  { path: 'liste-parcours', component: ListParcoursComponent, canActivate: [AuthGuardService], resolve: { allParcours: AllParcoursResolver }},
  { path: 'liste-parcours/add-parcours', component: AddParcoursComponent, canActivate: [AuthGuardService]},
  { path: 'liste-parcours/edit-parcours/:id', component: EditParcoursComponent, canActivate: [AuthGuardService], resolve: { parcours: ParcoursResolver }},
  { path: 'liste-parcours/info/:id', component: InfoParcoursComponent, canActivate: [AuthGuardService], resolve: { parcours: ParcoursResolver }},

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
