import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

import { ListStagesComponent } from './list-stages/list-stages.component';



@NgModule({
  declarations: [ListStagesComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ]
})
export class StageModule { }
