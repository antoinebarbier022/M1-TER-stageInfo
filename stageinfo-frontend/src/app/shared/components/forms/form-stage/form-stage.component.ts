import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StageModel } from 'src/app/core/models/StageModel';
import { StageService } from 'src/app/core/services/stage.service';

@Component({
  selector: 'app-form-stage',
  templateUrl: './form-stage.component.html',
  styleUrls: ['./form-stage.component.scss']
})
export class FormStageComponent implements OnInit {
  @Input() title: string = "";
  @Input() showMessages : boolean = false;
  @Input() selectedStage :StageModel = new StageModel();

  @Input() addStage: boolean = false;
  @Input() editStage: boolean = false;

  @Output() stageEvent = new EventEmitter<StageModel>();

  idStage = "";
  stageData: StageModel = new StageModel();
  message:string = "";

  allParcours:any;
  allEntreprises:any;

  // @ts-ignore
  stageForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();


  page: number = 1;
  nbMaxPage :number = 3;


  niveauRequis = ["Licence 3", "Master 1", "Master 2"];

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private stageService: StageService) {

    this.selectedStage = new StageModel();
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allEntreprises = this.route.snapshot.data.allEntreprises;
  }

  ngOnInit() {
    this.initForm();
    if(this.editStage){  // Si on est sur le formulaire edit parcours alors on remplie les champs
      this.idStage = this.selectedStage._id;
      this.setInputForm(this.idStage);
    }
  }

  // lorsque le parcours selectionner à changer :
  ngOnChanges(){
    this.initForm();
    if(this.editStage){  // Si on est sur le formulaire edit parcours alors on remplie les champs
      this.idStage = this.selectedStage._id;
      this.page = 1;
      this.setInputForm(this.idStage);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  initForm(){
    this.stageForm = this.formBuilder.group({
      titre:['',Validators.required],
      niveauRequis:['',Validators.required],
      parcours:[null,Validators.required],
      description:[''],
      duree:['', Validators.required],
      dateDebut:['', Validators.required],
      entreprise:[null, Validators.required],
      competences:['', Validators.required],
      conditions:['', Validators.required],
      avantages:['', Validators.required]
    });
  }

  setInputForm(id:any){
    // récupération des données du stage
    this.stageService.getStageById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_stage: StageModel) => {
        this.stageData = _stage;
        // On set les données du parcours dans le formulaire
        this.stageForm.patchValue({
          titre:        this.stageData.titre,
          description:  this.stageData.description,
          duree:        this.stageData.duree,
          dateDebut:    this.stageData.dateDebut,
          niveauRequis: this.stageData.niveauRequis,
          parcours:     this.stageData.parcours,
          entreprise:   this.stageData.entreprise,
          competences:  this.stageData.competences,
          conditions:   this.stageData.conditions,
          avantages:    this.stageData.avantages,
        });
      });
    }

    onSubmitForm() {
      const formValue = this.stageForm.value;
      const stage = new StageModel(
        this.idStage,
        formValue['titre'],
        formValue['description'],
        formValue['duree'],
        formValue['dateDebut'],
        formValue['niveauRequis'],
        formValue['parcours'],
        formValue['entreprise'],
        formValue['competences'],
        formValue['conditions'],
        formValue['avantages'],
      );
      
      if(this.addStage){
        this.ajouterStage(stage);
      }else {
        //alors on est dans editSage
        this.modifierStage(stage);
      }
    }

  ajouterStage(stage:any){
    this.stageService.addStage(stage)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("Stage : "+ stage.titre + " ajouté à la plateforme !");
        this.page = 1;
        this.message = "Le stage "+ stage.titre + " à été ajouté à la plateforme !";
        this.stageForm.reset();  // on reset les données dans le forumulaire
    });
  }

  modifierStage(stage:any){
    this.stageService.editStage(stage._id, stage)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("Stage : "+ stage.titre + " modifié !");
        this.page = 1;
        this.message = "Stage modifié !";
        this.stageForm.reset(); // on reset les données dans le forumulaire
        this.stageEvent.emit(stage); // on envoie le parcours dans le component parent
    });
  }

  displayFielset(theme : string) : boolean{
    switch (theme) {
      case "stage": //page 0
        return this.page === 1 ? true : false;
      case "entreprise": // page 1
        return this.page === 2 ? true : false;
      case "more": // page 1
        return this.page === 3 ? true : false;
      default:
        return false;
    }
  }

  isDone(theme : string) : boolean{
    switch (theme) {
      case "stage": //page 0
        return this.page >= 1 ? true : false;
      case "entreprise": // page 1
        return this.page >= 2 ? true : false;
      case "more": // page 1
        return this.page >= 3 ? true : false;
      default:
        return false;
    }
  }

  // Fonction qui permet de retourner true ou false pour pouvoir dire si on peut passé à la suite (bouton next)
  disabledNext() : boolean{
    switch (this.page) {
      case 1: //page 1 
        return false;
      case 2: // page 2 
        return false
      case 3: // page 3 
        return false; 

      default:
        return false;
    }
  }

  next(){
    if(this.page < this.nbMaxPage){
      this.page++;
    }
  }
  pred(){
    if(this.page > 1){
      this.page--;
    }
  }

  lastPage() :boolean {
    if(this.page == this.nbMaxPage){
      return true;
    }else{
      return false;
    }
  }
  firstPage() :boolean {
    if(this.page <= 1){
      return true;
    }else{
      return false;
    }
  }

}
