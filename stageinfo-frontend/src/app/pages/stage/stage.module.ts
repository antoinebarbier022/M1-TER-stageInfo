import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ListStagesComponent } from './list-stages/list-stages.component';
import { InfoStageComponent } from './info-stage/info-stage.component';
import { AddStageComponent } from './add-stage/add-stage.component';

@NgModule({
  declarations: [ListStagesComponent, InfoStageComponent, AddStageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    SharedModule
  ], 
  exports: [
    ListStagesComponent, 
    AddStageComponent
  ]
})
export class StageModule { }
