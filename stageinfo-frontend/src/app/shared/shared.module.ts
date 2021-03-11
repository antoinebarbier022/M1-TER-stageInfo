import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FormUserComponent } from './components/form-user/form-user.component';
import { FormEntrepriseComponent } from './components/form-entreprise/form-entreprise.component';
import { CardStagesComponent } from './components/card-stages/card-stages.component';



@NgModule({
  declarations: [FormUserComponent, FormEntrepriseComponent, CardStagesComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports:[FormUserComponent, FormEntrepriseComponent, CardStagesComponent]
})
export class SharedModule { }
