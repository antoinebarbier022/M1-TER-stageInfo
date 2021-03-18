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

  @Input() addParcours: boolean=false;
  @Input() editParcours: boolean=false;
  @Input() viewParcours: boolean=false;

  parcoursData: ParcoursModel;;
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
          console.log(_res);
          this.router.navigate(['/liste-parcours']);
      });
    }else if(this.editParcours){
      this.parcoursService.editParcours(this.route.snapshot.paramMap.get('id'), parcours)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any[]) => {
          console.log(_res);
          this.router.navigate(['/liste-parcours']);
      });
    }

  
    console.log(parcours);
  }

}
