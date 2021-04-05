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
import { AuthGuardService } from "./core/guards/auth.guard";
import { AuthGuard } from "./core/guards/login.guard";
import { RoleGuard } from "./core/guards/role.guard";

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
import { Error401Component } from './pages/erreurs/error401/error401.component';
import { AllRespParcoursResolver } from './core/resolves/all-resp-parcours.resolver';
import { AllEtudiantsResolver } from './core/resolves/all-etudiants.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'liste-stages', pathMatch: 'full', canActivate: [AuthGuardService, RoleGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'documentation', component: ExempleDocComponent, canActivate: [AuthGuardService, RoleGuard]},

  // routes stages
  { path: 'liste-stages',
      component: ListStagesComponent,
      canActivate: [AuthGuardService, RoleGuard],
      resolve: {
        allStages: AllStagesResolver,  // on associe un resolver à la route
        allParcours: AllParcoursResolver,
        allEntreprises: AllEntreprisesResolver
      }
  },
  { path: 'liste-stages/:id',
      component: InfoStageComponent,
      canActivate: [AuthGuardService, RoleGuard],
      resolve: {
        stage: StageResolver,  // on associe un resolver à la route
        allUsers: AllUsersResolver
      }
  },

  { path: 'saisir-stage', component: AddStageComponent, canActivate: [AuthGuardService, RoleGuard]},

  // route users

  { path: 'liste-utilisateurs', component: ListUsersComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { users: AllUsersResolver, allParcours: AllParcoursResolver, allEntreprises: AllEntreprisesResolver }},
  { path: 'liste-etudiants', component: ListEtudiantsComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { AllEtudiants: AllEtudiantsResolver, allParcours: AllParcoursResolver }},
  { path: 'liste-utilisateurs/import-users', component: ImportUsersComponent, canActivate: [AuthGuardService, RoleGuard],resolve: {allParcours: AllParcoursResolver}},
  { path: 'liste-utilisateurs/add-user', component: AddUserComponent, canActivate: [AuthGuardService, RoleGuard]},
  { path: 'liste-utilisateurs/edit-user/:id',
      component: EditUserComponent,
      canActivate: [AuthGuardService, RoleGuard],
      resolve: {
        user: UserResolver  // on associe un resolver à la route
      }
    },
  { path: 'liste-utilisateurs/edit-user-v2', component: EditUserV2Component, canActivate: [AuthGuardService, RoleGuard]},
  { path: 'liste-utilisateurs/user/:id',
      component: InfoUserComponent,
      canActivate: [AuthGuardService, RoleGuard],
      resolve: {
        user: UserResolver  // on associe un resolver à la route
      },
  },
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuardService, RoleGuard]},

  //routes entreprise
  { path: 'liste-entreprises', component: ListEntreprisesComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { entreprises: AllEntreprisesResolver, allUsers: AllUsersResolver, }},
  { path: 'liste-entreprises/:id', component: InfoEntrepriseComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { entreprise: EntrepriseResolver, allUsers: AllUsersResolver }},

  // route soutenance
  { path: 'liste-soutenances', component: ListSoutenancesComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { soutenances: AllSoutenancesResolver }},
  { path: 'liste-soutenances/add-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RoleGuard]},
  { path: 'liste-soutenances/edit-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RoleGuard]},
  { path: 'liste-soutenances/soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RoleGuard]},

  // route parcours
  { path: 'liste-parcours', component: ListParcoursComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { allParcours: AllParcoursResolver , allResponsables: AllRespParcoursResolver }},
  { path: 'liste-parcours/:id', component: InfoParcoursComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { parcours: ParcoursResolver }},

  // config calendrier soutenance
  { path: 'configuration-calendrier-soutenances', component: ConfigCalendrierSoutenancesComponent, canActivate: [AuthGuardService, RoleGuard]},

  { path: 'error401', component: Error401Component, canActivate: [AuthGuardService]},
  { path: 'not-found', component: Error404Component, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'not-found', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
