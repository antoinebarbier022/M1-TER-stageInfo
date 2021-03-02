import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

import { Error404Component } from './error404/error404.component';
import { ExempleTemplateComponent } from './exempleTemplate/exempleTemplate.component';

import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    ExempleTemplateComponent, 
    Error404Component, 
   ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    UserModule
  ], exports:[
    ExempleTemplateComponent, 
    Error404Component, 
    UserModule],
})
export class PagesModule { }
