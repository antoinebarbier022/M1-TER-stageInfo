import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-fiche-suivi',
  templateUrl: './form-fiche-suivi.component.html',
  styleUrls: ['./form-fiche-suivi.component.scss']
})
export class FormFicheSuiviComponent implements OnInit {

  public readonly title: string = "Fiche de suivi";
  niveau = ["M2", "M1", "L3"];
  contact = ["Téléphone", "Mail", "Visite"];
  reponseBinaire = ['Oui', 'Non'];
  allParcours:any;
  allUsers: Array<any>;

  public model: any;

  // @ts-ignore
  ficheSuiviForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) { 
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allUsers = this.route.snapshot.data.allUsers;
  }

  ngOnInit(): void {
    this.initForm();
  }

  /*
  formatter = (result: string) => result.toUpperCase();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.allUsers.filter(v => console.log(v)))
  );
  */

  initForm(){
    this.ficheSuiviForm = this.formBuilder.group({
      // Informations générales
      nom:['',Validators.required],
      prenom:['',Validators.required],
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
    console.log("Submit");
  }
}
