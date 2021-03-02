import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404Component } from './error404/error404.component';
import { ExempleTemplateComponent } from './exempleTemplate/exempleTemplate.component';

//import mes module
import { UserModule } from './user/user.module';
import { DocumentationModule } from './documentation/documentation.module';

@NgModule({
  declarations: [ExempleTemplateComponent, Error404Component,],
  imports: [
    CommonModule,
    UserModule,
    DocumentationModule
  ], exports:[ExempleTemplateComponent, Error404Component, UserModule, DocumentationModule],
})
export class PagesModule { }
