import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Error404Component } from './error404/error404.component';
import { ExempleTemplateComponent } from './exempleTemplate/exempleTemplate.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";

import { UserModule } from './user/user.module';
import { StageModule } from './stage/stage.module';



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
    UserModule,
    StageModule,
    FormsModule
  ], exports:[
    ExempleTemplateComponent, 
    Error404Component, 
    LoginComponent,
    UserModule,
    StageModule],
})
export class PagesModule { }
