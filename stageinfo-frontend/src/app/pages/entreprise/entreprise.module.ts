import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

import { ListEntreprisesComponent } from './list-entreprises/list-entreprises.component';
import { AddEntrepriseComponent } from './add-entreprise/add-entreprise.component';
import { EditEntrepriseComponent } from './edit-entreprise/edit-entreprise.component';
import { InfoEntrepriseComponent } from './info-entreprise/info-entreprise.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListEntreprisesComponent, 
    AddEntrepriseComponent, 
    EditEntrepriseComponent, 
    InfoEntrepriseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    SharedModule
  ],
  exports: [
    ListEntreprisesComponent, 
    AddEntrepriseComponent, 
    EditEntrepriseComponent, 
    InfoEntrepriseComponent
  ],
})
export class EntrepriseModule { }
