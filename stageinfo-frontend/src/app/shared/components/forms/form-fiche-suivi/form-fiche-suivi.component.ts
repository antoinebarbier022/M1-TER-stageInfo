import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AutocompletionSearch } from 'src/app/shared/classes/autocompletion-search';

@Component({
  selector: 'app-form-fiche-suivi',
  templateUrl: './form-fiche-suivi.component.html',
  styleUrls: ['./form-fiche-suivi.component.scss']
})
export class FormFicheSuiviComponent extends AutocompletionSearch implements OnInit {

  public readonly title: string = "Fiche de suivi";
  niveau = ["M2", "M1", "L3"];
  contact = ["Téléphone", "Mail", "Visite"];
  reponseBinaire = ['Oui', 'Non'];
  allParcours:any;
  allUsers: Array<any>;

  public model: any;

  todayNumber: number = Date.now();

  // @ts-ignore
  ficheSuiviForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) { 
    super();
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allUsers = this.route.snapshot.data.allUsers;
    this.userItems = this.allUsers;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ficheSuiviForm = this.formBuilder.group({
      // Informations générales
      nom:['',Validators.required],
      parcours:['',Validators.required],
      niveau:['',Validators.required],
      tuteur:['',Validators.required],
      responsable:['',Validators.required],

      // Contact 1
      dateVisite:['',Validators.required],
      typeContact:['', Validators.required],
      commentaire:['', Validators.required],
      
      // Bilan stage
      dateDebut:['', Validators.required],
      dateFin:['', Validators.required],
      bilan:['', Validators.required],
      embauche:['', Validators.required]
    });
  }
  
  onSubmitForm() {
    const formValue = this.ficheSuiviForm.value;
    console.log(formValue)
  }
}
