import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FormUserComponent } from './components/form-user/form-user.component';
import { FormEntrepriseComponent } from './components/form-entreprise/form-entreprise.component';
import { CardStagesComponent } from './components/card-stages/card-stages.component';
import { ModalComponent } from './components/modal/modal.component';
import { ListFilterComponent } from './components/list-filter/list-filter.component';
import { ListPaginationComponent } from './components/list-pagination/list-pagination.component';



@NgModule({
  declarations: [FormUserComponent, FormEntrepriseComponent, CardStagesComponent, ModalComponent, ListFilterComponent, ListPaginationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports:[FormUserComponent, FormEntrepriseComponent, CardStagesComponent, ModalComponent, ListFilterComponent]
})
export class SharedModule { }
