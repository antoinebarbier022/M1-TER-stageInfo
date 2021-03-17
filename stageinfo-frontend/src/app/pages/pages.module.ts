import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Error404Component } from './erreurs/error404/error404.component';
import { ExempleTemplateComponent } from './exempleTemplate/exempleTemplate.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";

// Importation des modules
import { SharedModule } from '../shared/shared.module';
import { UserModule } from './user/user.module';
import { StageModule } from './stage/stage.module';
import { ParcoursModule } from './parcours/parcours.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { SoutenanceModule } from './soutenance/soutenance.module';



@NgModule({
  declarations: [
    ExempleTemplateComponent, 
    Error404Component, 
    LoginComponent,
   ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,

    UserModule,
    StageModule,
    EntrepriseModule,
    SoutenanceModule,
    ParcoursModule
    ],
  exports:[
    ExempleTemplateComponent, 
    Error404Component, 
    LoginComponent,

    SharedModule,
    UserModule,
    StageModule,
    EntrepriseModule,
    SoutenanceModule,
    ParcoursModule
  ],
})
export class PagesModule { }
