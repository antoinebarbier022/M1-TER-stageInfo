import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiche-appreciation-stage',
  templateUrl: './fiche-appreciation-stage.component.html',
  styleUrls: ['./fiche-appreciation-stage.component.scss']
})
export class FicheAppreciationStageComponent implements OnInit {

  public readonly title: string = "Fiche d'appréciation du stage";

  // @ts-ignore
  ficheAppreciationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


}
