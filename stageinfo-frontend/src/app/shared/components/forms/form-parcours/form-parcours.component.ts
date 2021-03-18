import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ParcoursModel } from 'src/app/core/models/ParcoursModel';

@Component({
  selector: 'app-form-parcours',
  templateUrl: './form-parcours.component.html',
  styleUrls: ['./form-parcours.component.scss']
})
export class FormParcoursComponent implements OnInit {
  @Input() title: string ="";

  @Input() addParcours: boolean=false;
  @Input() editParcours: boolean=false;
  @Input() viewParcours: boolean=false;

  parcoursData: ParcoursModel;;
  // @ts-ignore
  parcoursForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { 
    // Si on est sur le component formulaire ajout de parcours alors on peut récupérer les données du parcours 
    if(!this.addParcours){
      this.parcoursData = this.route.snapshot.data.parcours;  
    }else{ // sinon vide
      this.parcoursData = new ParcoursModel('','','','','')
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.parcoursForm = this.formBuilder.group({
      acronyme:['',Validators.required],
      niveau:['',Validators.required],
      intitule:['',Validators.required],
      description:[''],
      responsable:['', Validators.required]
    });
    console.log(this.parcoursData);
    if(this.editParcours){
      this.parcoursForm.patchValue({
        acronyme:this.parcoursData.acronyme,
        niveau:this.parcoursData.niveau,
        intitule:this.parcoursData.intitule,
        description:this.parcoursData.description,
        responsable:this.parcoursData.responsable
      });
    }
  }

  onSubmitForm() {
    const formValue = this.parcoursForm.value;
    const newParcours = new ParcoursModel(
      formValue['acronyme'],
      formValue['niveau'],
      formValue['intitule'],
      formValue['description'],
      formValue['responsable']
    );
    console.log(newParcours);
  }

}
