import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EtatStage } from 'src/app/core/enums/EtatStage';
import { RoleUser } from 'src/app/core/enums/RoleUser';
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
  allRapporteur:any;

  selectEtudiant:any;
  selectTuteur:any;
  selectRapporteur:any;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  // variable init dans le constructeur qui contiennent tous les messages d'information et buton et select de changement d'état d'un stage
  messages: any;
  messagesButton: any ;
  messagesSelect: any ;

  constructor(private stageService:StageService, 
              private route:ActivatedRoute, 
              private authService:AuthService) { 

    this.selectEtudiant="";
    this.selectTuteur="";
    this.selectRapporteur="";

    this.allUsers = this.route.snapshot.data.allUsers;
    this.allEtudiant = this.allUsers.filter(((obj: { role: any; }) => obj.role == 'etudiant'));
    this.allTuteur = this.allUsers.filter(((obj: { role: any; }) => obj.role == 'tuteur'));
  }



  ngOnInit(): void {

    // on enleve le tuteur du stage de la liste des rapporteurs potentiel
    this.allRapporteur = this.allTuteur.filter(((obj: { _id: any; }) => obj._id != this.stage.tuteur?._id))

    // type de role disponible : 
    // - all : tous les roles
    // - les roles normales
    // - ajouteur : pour indiqué que la personne est l'ajouteur
    this.messages = [
      // stage refusé
      { etat:[EtatStage.REFUSE], role:['all'], content:"Le stage a été refusé."},
      // stage validé
      { etat:[EtatStage.VALIDE], role:['etudiant','invite'], content:"<strong>Pour postuler à ce stage, veuillez contacter l'entreprise.</strong><br> Après l'accord de l'entreprise, veuillez signaler l'obtention de votre stage au responsable des stages."},
      // stage affecté à un étudiant
      { etat:[EtatStage.AFFECT_ETUDIANT], role:['etudiant','invite'], content:"Un étudiant à déja été affecté pour ce stage."},
      // stage réservé
      { etat:[EtatStage.RESERVE], role:['etudiant','invite'], content:"Ce stage est déjà <strong>réservé</strong> à un étudiant."},
      // stage affecté à un rapporteur
      { etat:[EtatStage.AFFECT_RAPPORTEUR], role:['all'], content:"<strong>Information :</strong> Le stage passera à l'état terminé une fois que le note du stage sera délivré."},
      // stage terminé
      { etat:[EtatStage.TERMINE], role:['all'], content:"<strong>Stage terminé :</strong> La fiche du stage a été placé dans les archives."},
    ];

    this.messagesButton = [
      { etat:[EtatStage.AFFECT_ETUDIANT,EtatStage.RESERVE], role:['tuteur'], newState:EtatStage.AFFECT_TUTEUR, content:"Devenir le tuteur de ce stage"},
      { etat:[EtatStage.AFFECT_TUTEUR], role:['tuteur'], newState:EtatStage.AFFECT_RAPPORTEUR, content:"Devenir le rapporteur de ce stage"},
      { etat:[EtatStage.RESERVE], role:['ajouteur'], newState:EtatStage.VALIDE, content:"Rendre ce stage disponible pour tous les étudiants"},
    ];
    
    this.messagesSelect = [
      {  // selectionner un etudiant
        etat:[EtatStage.VALIDE], // message s'affiche pour ses états 
        role:['admin'],  // seulement pour ses roles
        newState:EtatStage.AFFECT_ETUDIANT,  // changement d'état vers newState
        name:"selectEtudiant",  // nom pour le formulaire template
        typeTable:'etudiant',  // type d'utilisateur dans le select
        label:"Affecter un étudiant",  
        default:"Selectionner un étudiant", // option par default du select
        button:"Affecter l'étudiant !!!!" // message du bouton submit
      },
      { // selectionner un tuteur
        etat:[EtatStage.AFFECT_ETUDIANT, EtatStage.RESERVE], 
        role:['admin'], 
        newState:EtatStage.AFFECT_TUTEUR, 
        name:"selectTuteur",
        typeTable:'tuteur', 
        label:"Affecter un tuteur", 
        default:"Selectionner un tuteur",
        button:"Affecter le tuteur !!!!"
      },
      { // selectionner un rapporteur
        etat:[EtatStage.AFFECT_TUTEUR], 
        role:['admin'], 
        newState:EtatStage.AFFECT_RAPPORTEUR, 
        name:"selectRapporteur",
        typeTable: 'rapporteur',
        label:"Affecter un rapporteur", 
        default:"Selectionner un rapporteur",
        button:"Affecter le rapporteur !!!!"
      },
    ];
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  afficheMessage(etat:string, role:string):boolean{
    // l'admin avec la vu du role
    if( ( (role == 'ajouteur') && (this.ajouteurIsAuth())) || (role == 'all') || ((this.getRole() == role) && (role != 'admin')) || (this.getRole() == 'admin' && this.getViewRole() == role)){
      if(this.getState() == etat){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  onSubmit(form: NgForm,etat:string){
    switch (etat) {
      case EtatStage.RESERVE: this.onSubmitReserve(form); break;
      case EtatStage.AFFECT_ETUDIANT: this.onSubmitAffectEtudiant(form); break;
      case EtatStage.AFFECT_TUTEUR: this.onSubmitAffectTuteur(form); break;
      case EtatStage.AFFECT_RAPPORTEUR: this.onSubmitAffectRapporteur(form); break;
      default:
        break;
    }
  }
 
  onSubmitReserve(form: NgForm){
      const newData = {
        etat: EtatStage.RESERVE,
        etudiant : form.value['selectEtudiant'],
      };
      this.changerEtat(EtatStage.RESERVE,newData);
      // on met à jour l'objet local
      var index = this.allEtudiant.findIndex(((obj: { _id: any; }) => obj._id == newData.etudiant));
      this.stage.etudiant = {
        _id: form.value['selectEtudiant'], 
        nom: this.allEtudiant[index].nom, 
        prenom:this.allEtudiant[index].prenom};
  }

  onSubmitAffectEtudiant(form: NgForm){
    const newData = {
      etat: EtatStage.AFFECT_ETUDIANT,
      etudiant : form.value['selectEtudiant'],
    };
    this.changerEtat(EtatStage.AFFECT_ETUDIANT,newData);
    // on met à jour l'objet local
    var index = this.allEtudiant.findIndex(((obj: { _id: any; }) => obj._id == newData.etudiant));
    this.stage.etudiant = {
      _id: form.value['selectEtudiant'], 
      nom: this.allEtudiant[index].nom, 
      prenom:this.allEtudiant[index].prenom};
  }

  onSubmitAffectTuteur(form: NgForm){
    var newData:any;
    if(form.value['selectTuteur']){ // si true alors il est rempli
      newData = {
        etat: EtatStage.AFFECT_TUTEUR,
        tuteur : form.value['selectTuteur'],
      };
    }else{ // alors c'est le tuteur lui meme qui est selectionné
      if(this.authService.getRole() == RoleUser.TUTEUR){
        newData = {
          etat: EtatStage.AFFECT_TUTEUR,
          tuteur : this.authService.getUserid(),
        };
      }else{
        console.log("ERREUR : Le tuteur n'est pas selectionné !!!")
      }
    }
    
    this.changerEtat(EtatStage.AFFECT_TUTEUR,newData);
    // on met à jour l'objet local
    var index = this.allTuteur.findIndex(((obj: { _id: any; }) => obj._id == newData.tuteur));
    this.stage.tuteur = {
      _id: newData.tuteur, 
      nom: this.allTuteur[index].nom, 
      prenom: this.allTuteur[index].prenom};
  }

  onSubmitAffectRapporteur(form: NgForm){
    const newData = {
      etat: EtatStage.AFFECT_RAPPORTEUR,
      rapporteur : form.value['selectRapporteur'],
    };
    this.changerEtat(EtatStage.AFFECT_RAPPORTEUR,newData);
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
      case EtatStage.VALIDE: // valide to propose :  donc on enlève la date de validation
        newData = {
          etat: EtatStage.PROPOSE,
          dateValide: null,
        };
        // on met à jour l'objet local
        this.stage.dateValide = null;
        break;
      case EtatStage.REFUSE: // refuse to propose :  rien à changé à part l'état
        newData = {
          etat: EtatStage.PROPOSE,
          dateValide: null,
        };
        // on met à jour l'objet local
        this.stage.dateValide = null;
        break;
      case EtatStage.AFFECT_ETUDIANT: // affectEtudiant to valide : donc on enlève l'étudiant associé'
        newData = {
          etat: EtatStage.VALIDE,
          etudiant: null,
        };
        // on met à jour l'objet local
        this.stage.etudiant = null;
        break;
      case EtatStage.AFFECT_TUTEUR:
        newData = {
          etat: EtatStage.AFFECT_ETUDIANT,
          tuteur: null,
        };
        // on met à jour l'objet local
        this.stage.tuteur = null;
        break;
      case EtatStage.AFFECT_RAPPORTEUR:
        newData = {
          etat: EtatStage.AFFECT_TUTEUR,
          rapporteur: null,
        };
        // on met à jour l'objet local
        this.stage.rapporteur = null;
        break;
      case EtatStage.TERMINE:
        newData = {
          etat: EtatStage.AFFECT_RAPPORTEUR
        };
        break;
      default:
        newData = {
          etat: EtatStage.PROPOSE,
        };
        break;
    }
    return this.changerEtat(newData.etat,newData);
  }

  changerEtat(newState:string, user:any=""){
    // si l'utilisateur qui à créer le stage est un étudiant et que le stage est validé alors le stage est réservé à l'étudiant
    if(newState == EtatStage.VALIDE && this.isEtudiant(this.stage?.ajouteur?._id)){
      newState = EtatStage.RESERVE; // on passe à l'état réservé
    }
    this.stageService.editState(this.stage._id, newState, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
        if( (this.stage.etat == EtatStage.VALIDE) || (this.stage.etat == EtatStage.RESERVE)){
          this.stage.dateValide = new Date();
        }
      });
  }

  listeUser(type:string):any{
    switch (type) {
      case 'etudiant':
        return this.allEtudiant;
      case 'tuteur':
        return this.allTuteur;
      case 'rapporteur':
        this.allRapporteur = this.allTuteur.filter(((obj: { _id: any; }) => obj._id != this.stage.tuteur?._id));
        return this.allRapporteur;
      default:
        return this.allUsers;
    }
  }

  isEtudiant(id:any):boolean{
    // si il ne trouve pas l'ajouteur dans la liste des étudiants alors ce n'est pas un étudiant
    return this.allEtudiant.some(((obj: { _id: any; }) => obj._id == id ));
  }

  ajouteurIsAuth():boolean{
    return this.stage.ajouteur == this.authService.getUserid();
  }

}
