import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FormUserComponent } from './components/form-user/form-user.component';
import { FormEntrepriseComponent } from './components/form-entreprise/form-entreprise.component';
import { CardStagesComponent } from './components/card-stages/card-stages.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavigationComponent } from './components/navigation/navigation.component';



@NgModule({
  declarations: [
    FormUserComponent, 
    FormEntrepriseComponent, 
    CardStagesComponent, 
    ModalComponent, 
    NavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports:[
    FormUserComponent, 
    FormEntrepriseComponent, 
    CardStagesComponent, 
    ModalComponent, 
    NavigationComponent]
})
export class SharedModule { }
