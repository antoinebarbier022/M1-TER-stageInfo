import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AutocompletionSearch } from 'src/app/shared/classes/autocompletion-search';

@Component({
  selector: 'app-form-fiche-notation',
  templateUrl: './form-fiche-notation.component.html',
  styleUrls: ['./form-fiche-notation.component.scss']
})
export class FormFicheNotationComponent extends AutocompletionSearch implements OnInit {

  public readonly title: string = "Fiche de notation";

  todayNumber: number = Date.now();

  // @ts-ignore
  ficheNotationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) { 
    super();
    this.userItems = this.route.snapshot.data.allUsers;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ficheNotationForm = this.formBuilder.group({
      // Étudiant
      nomEtudiant:['',Validators.required],

      // Soutenance
      date:['',Validators.required],
      heure:['',Validators.required],

      // Représentant entreprise
      prenomRepresentant:['',Validators.required],
      nomRepresentant:['',Validators.required],

      // Tuteur université 1
      prenomTuteur1:['',Validators.required],
      nomTuteur1:['',Validators.required],

      // Tuteur université 2
      prenomTuteur2:['',Validators.required],
      nomTuteur2:['',Validators.required],

      // Commentaire & notation
      commentaire:['',Validators.required],
      note:['', Validators.required]
    });
  }
  
  onSubmitForm() {
    console.log("Submit");
  }

}
