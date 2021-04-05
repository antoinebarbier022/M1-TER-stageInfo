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
      const newData = {
        etat: 'reserve',
        etudiant : form.value['selectEtudiant'],
      };
      this.changerEtat('reserve',newData);
      // on met à jour l'objet local
      var index = this.allEtudiant.findIndex(((obj: { _id: any; }) => obj._id == newData.etudiant));
      this.stage.etudiant = {
        _id: form.value['selectEtudiant'], 
        nom: this.allEtudiant[index].nom, 
        prenom:this.allEtudiant[index].prenom};
  }

  onSubmitAffectEtudiant(form: NgForm){
    const newData = {
      etat: 'affectEtudiant',
      etudiant : form.value['selectEtudiant'],
    };
    this.changerEtat('affectEtudiant',newData);
    // on met à jour l'objet local
    var index = this.allEtudiant.findIndex(((obj: { _id: any; }) => obj._id == newData.etudiant));
    this.stage.etudiant = {
      _id: form.value['selectEtudiant'], 
      nom: this.allEtudiant[index].nom, 
      prenom:this.allEtudiant[index].prenom};
  }

  onSubmitAffectTuteur(form: NgForm){
    const newData = {
      etat: 'affectTuteur',
      tuteur : form.value['selectTuteur'],
    };
    this.changerEtat('affectTuteur',newData);
    // on met à jour l'objet local
    var index = this.allTuteur.findIndex(((obj: { _id: any; }) => obj._id == newData.tuteur));
    this.stage.tuteur = {
      _id: form.value['selectTuteur'], 
      nom: this.allTuteur[index].nom, 
      prenom: this.allTuteur[index].prenom};
  }

  onSubmitAffectRapporteur(form: NgForm){
    const newData = {
      etat: 'affectRapporteur',
      rapporteur : form.value['selectRapporteur'],
    };
    this.changerEtat('affectRapporteur',newData);
    // on met à jour l'objet local
    var index = this.allTuteur.findIndex(((obj: { _id: any; }) => obj._id == newData.rapporteur));
    this.stage.rapporteur = {
      _id: form.value['selectRapporteur'], 
      nom: this.allTuteur[index].nom, 
      prenom: this.allTuteur[index].prenom};
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
    var newData;
    switch(this.getState()){
      case 'valide': // valide to propose :  donc on enlève la date de validation
        newData = {
          etat: 'propose',
          dateValide: null,
        };
        // on met à jour l'objet local
        this.stage.dateValide = null;
        break;
      case 'refuse': // refuse to propose :  rien à changé à part l'état
        newData = {
          etat: 'propose',
          dateValide: null,
        };
        // on met à jour l'objet local
        this.stage.dateValide = null;
        break;
      case 'affectEtudiant': // affectEtudiant to valide : donc on enlève l'étudiant associé'
        newData = {
          etat: 'valide',
          etudiant: null,
        };
        // on met à jour l'objet local
        this.stage.etudiant = null;
        break;
      case 'affectTuteur':
        newData = {
          etat: 'affectEtudiant',
          tuteur: null,
        };
        // on met à jour l'objet local
        this.stage.tuteur = null;
        break;
      case 'affectRapporteur':
        newData = {
          etat: 'affectTuteur',
          rapporteur: null,
        };
        // on met à jour l'objet local
        this.stage.rapporteur = null;
        break;
      case 'termine':
        newData = {
          etat: 'affectRapporteur'
        };
        break;
      default:
        newData = {
          etat: 'propose',
        };
        break;
    }
    return this.changerEtat(newData.etat,newData);
  }

  changerEtat(newState:string, user:any=""){
    this.stageService.editState(this.stage._id, newState, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
        if(this.stage.etat == 'valide'){
          this.stage.dateValide = new Date();
        }
      });
  }

}
