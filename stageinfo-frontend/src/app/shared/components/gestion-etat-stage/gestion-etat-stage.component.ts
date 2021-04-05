import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { StageService } from 'src/app/core/services/stage.service';

@Component({
  selector: 'app-gestion-etat-stage',
  templateUrl: './gestion-etat-stage.component.html',
  styleUrls: ['./gestion-etat-stage.component.scss']
})
export class GestionEtatStageComponent implements OnInit, OnDestroy {

  @Input() stage:any;

  allUsers:any;
  allEtudiant:any;
  allTuteur:any;

  selectEtudiant:any;
  selectTuteur:any;
  selectRapporteur:any;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService:StageService, 
              private route:ActivatedRoute, 
              private authService:AuthService) { 
  }

  ngOnInit(): void {
    this.allUsers = this.route.snapshot.data.allUsers;
    this.allEtudiant = this.allUsers.filter(((obj: { role: any; }) => obj.role == 'etudiant'));
    this.allTuteur = this.allUsers.filter(((obj: { role: any; }) => obj.role == 'tuteur'));
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  // pour ce component on utilise des formulaires avec la méthode template 
  onSubmitReserve(form: NgForm){
    console.log(form.value['selectEtudiant']);
    var newState = 'reserve';
    var user = form.value['selectEtudiant'];
    console.log(newState+ ' '+ user);
    this.stageService.editState(this.stage._id, newState, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
      });
  }

  onSubmitAffectEtudiant(form: NgForm){
    console.log(form.value['selectEtudiant']);
    var newState = 'affectEtudiant';
    var user = form.value['selectEtudiant'];
    console.log(newState+ ' '+ user);
    this.stageService.editState(this.stage._id, newState, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
      });
  }

  onSubmitAffectTuteur(form: NgForm){
    console.log(form.value['selectTuteur']);
    var newState = 'affectTuteur';
    var user = form.value['selectTuteur'];
    console.log(newState+ ' '+ user);
    this.stageService.editState(this.stage._id, newState, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
      });
  }

  onSubmitAffectRapporteur(form: NgForm){
    console.log(form.value['selectRapporteur']);
    var newState = 'affectRapporteur';
    var user = form.value['selectRapporteur'];
    console.log(newState+ ' '+ user);
    this.stageService.editState(this.stage._id, newState, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
      });
  }

  getState():string{
    return this.stage.etat;
  }

  getRole():any{
    return this.authService.getRole();
  }

  getViewRole(){
    return this.authService.getViewRole();
  }

  etatPrecedent():void{
    switch(this.getState()){
      case 'valide':
        return this.changerEtat('propose');
      case 'refuse':
        return this.changerEtat('propose');
      case 'affectEtudiant':
        return this.changerEtat('valide');
      case 'affectTuteur':
        return this.changerEtat('affectEtudiant');
      case 'affectRapporteur':
        return this.changerEtat('affectTuteur');
      case 'termine':
        return this.changerEtat('affectRapporteur');

    }
  }

  changerEtat(newState:string){
    this.stageService.editState(this.stage._id, newState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
      });
  }

}
