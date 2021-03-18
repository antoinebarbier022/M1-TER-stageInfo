import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ListParcoursComponent } from './list-parcours/list-parcours.component';
import { AddParcoursComponent } from './add-parcours/add-parcours.component';
import { EditParcoursComponent } from './edit-parcours/edit-parcours.component';
import { InfoParcoursComponent } from './info-parcours/info-parcours.component';



@NgModule({
  declarations: [
    ListParcoursComponent, 
    AddParcoursComponent, 
    EditParcoursComponent, 
    InfoParcoursComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    SharedModule
  ], exports: [
    ListParcoursComponent, 
    AddParcoursComponent, 
    EditParcoursComponent, 
    InfoParcoursComponent]
})
export class ParcoursModule { }
