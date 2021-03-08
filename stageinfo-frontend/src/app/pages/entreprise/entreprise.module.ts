import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEntreprisesComponent } from './list-entreprises/list-entreprises.component';
import { AddEntrepriseComponent } from './add-entreprise/add-entreprise.component';
import { EditEntrepriseComponent } from './edit-entreprise/edit-entreprise.component';
import { InfoEntrepriseComponent } from './info-entreprise/info-entreprise.component';



@NgModule({
  declarations: [ListEntreprisesComponent, AddEntrepriseComponent, EditEntrepriseComponent, InfoEntrepriseComponent],
  imports: [
    CommonModule
  ]
})
export class EntrepriseModule { }
