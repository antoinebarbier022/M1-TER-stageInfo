import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParcoursModel } from 'src/app/core/models/ParcoursModel';
import { ParcoursService } from 'src/app/core/services/parcours.service';

@Component({
  selector: 'app-form-parcours',
  templateUrl: './form-parcours.component.html',
  styleUrls: ['./form-parcours.component.scss']
})
export class FormParcoursComponent implements OnInit {
  @Input() title: string ="";
  @Input() idParcours: string | null ="";

  @Input() addParcours: boolean=false;
  @Input() editParcours: boolean=false;
  @Input() viewParcours: boolean=false;

  
  parcoursData: ParcoursModel = new ParcoursModel();
  // @ts-ignore
  parcoursForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private parcoursService: ParcoursService) { 
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  initForm(){
    this.parcoursForm = this.formBuilder.group({
      acronyme:['',Validators.required],
      niveau:['',Validators.required],
      intitule:['',Validators.required],
      description:[''],
      responsable:['', Validators.required]
    });

    // Si on est sur le formulaire parcours alors on remplie les champs
    if(this.editParcours){
      // récupération des données du parcours
      this.parcoursService.getParcoursById(this.idParcours)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_parcours: ParcoursModel) => {
          this.parcoursData = _parcours;
          // On set les données du parcours dans le formulaire
          this.parcoursForm.patchValue({
            acronyme:this.parcoursData.acronyme,
            niveau:this.parcoursData.niveau,
            intitule:this.parcoursData.intitule,
            description:this.parcoursData.description,
            responsable:this.parcoursData.responsable
          });
          console.log(_parcours);
        });
    }
  }

  onSubmitForm() {
    const formValue = this.parcoursForm.value;
    const parcours = new ParcoursModel(
      formValue['acronyme'],
      formValue['niveau'],
      formValue['intitule'],
      formValue['description'],
      formValue['responsable']
    );

    if(this.addParcours){
      this.parcoursService.addParcours(parcours)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any[]) => {
          console.log("Parcours ajouté !");
      });
    }else {
      if(this.editParcours){
        this.parcoursService.editParcours(this.idParcours, parcours)
        .pipe(takeUntil(this.destroy$))
          .subscribe((_res: any[]) => {
            console.log("Parcours modifié !");
        });
      }
      console.log(parcours);
    }
  }
}
