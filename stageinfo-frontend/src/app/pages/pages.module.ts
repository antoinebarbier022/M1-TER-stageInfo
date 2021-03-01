import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404Component } from './error404/error404.component';
import { ExempleTemplateComponent } from './exempleTemplate/exempleTemplate.component';

@NgModule({
  declarations: [
    ExempleTemplateComponent, 
    Error404Component,
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
