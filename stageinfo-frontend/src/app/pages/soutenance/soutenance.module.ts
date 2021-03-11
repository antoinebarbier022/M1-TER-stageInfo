import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

import { SharedModule } from '../../shared/shared.module';

import { ListSoutenancesComponent } from './list-soutenances/list-soutenances.component';
import { AddSoutenanceComponent } from './add-soutenance/add-soutenance.component';



@NgModule({
  declarations: [
    ListSoutenancesComponent, 
    AddSoutenanceComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    SharedModule
  ],exports:[
    ListSoutenancesComponent, 
    AddSoutenanceComponent
  ],
})
export class SoutenanceModule { }
