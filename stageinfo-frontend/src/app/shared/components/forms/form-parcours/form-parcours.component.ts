import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  // @ts-ignore
  parcoursForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.parcoursForm = this.formBuilder.group({
      acronyme:['', Validators.required],
      niveau:['', Validators.required],
      intitule:['', Validators.required],
      description:[''],
      responsable:['', Validators.required]
    });
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
