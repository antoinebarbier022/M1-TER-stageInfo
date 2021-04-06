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

    // type de role disponible : 
    // - all : tous les roles
    // - les roles normales
    // - ajouteur : pour indiqué que la personne est l'ajouteur
    this.messages = [
      // stage refusé
      { etat:['refuse'], role:['all'], content:"Le stage a été refusé."},
      // stage validé
      { etat:['valide'], role:['etudiant','invite'], content:"<strong>Pour postuler à ce stage, veuillez contacter l'entreprise.</strong><br> Après l'accord de l'entreprise, veuillez signaler l'obtention de votre stage au responsable des stages."},
      // stage affecté à un étudiant
      { etat:['affectEtudiant'], role:['etudiant','invite'], content:"Un étudiant à déja été affecté pour ce stage."},
      // stage réservé
      { etat:['reserve'], role:['etudiant','invite'], content:"Ce stage est déjà <strong>réservé</strong> à un étudiant."},
      // stage affecté à un rapporteur
      { etat:['affectRapporteur'], role:['all'], content:"<strong>Information :</strong> Le stage passera à l'état terminé une fois que le note du stage sera délivré."},
      // stage terminé
      { etat:['termine'], role:['all'], content:"<strong>Stage terminé :</strong> La fiche du stage a été placé dans les archives."},
    ];

    this.messagesButton = [
      { etat:['affectEtudiant','reserve'], role:['tuteur'], newState:"affectTuteur", content:"Devenir le tuteur de ce stage"},
      { etat:['affectTuteur'], role:['tuteur'], newState:"affectRapporteur", content:"Devenir le rapporteur de ce stage"},
      { etat:['reserve'], role:['etudiant'], newState:"valide", content:"Rendre ce stage disponible pour tous les étudiants"},
    ];
    
    this.messagesSelect = [
      {  // selectionner un etudiant
        etat:['valide'], // message s'affiche pour ses états 
        role:['admin'],  // seulement pour ses roles
        newState:"affectEtudiant",  // changement d'état vers newState
        name:"selectEtudiant",  // nom pour le formulaire template
        dataTable:this.allEtudiant,  // tableau des données proposées dans le select
        label:"Affecter un étudiant",  
        default:"Selectionner un étudiant", // option par default du select
        button:"Affecter l'étudiant !!!!" // message du bouton submit
      },
      { // selectionner un tuteur
        etat:['affectEtudiant','reserve'], 
        role:['admin'], 
        newState:"affectTuteur", 
        name:"selectTuteur",
        dataTable:this.allTuteur, 
        label:"Affecter un tuteur", 
        default:"Selectionner un tuteur",
        button:"Affecter le tuteur !!!!"
      },
      { // selectionner un rapporteur
        etat:['affectTuteur'], 
        role:['admin'], 
        newState:"affectRapporteur", 
        name:"selectRapporteur",
        dataTable: this.allTuteur.filter(((obj: { _id: any; }) => obj._id != this.stage.tuteur?._id)),  // on enleve le tuteur du stage de la liste des rapporteur potentiel
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
    if((role == 'all') || ((this.getRole() == role) && (role != 'admin')) || (this.getRole() == 'admin' && this.getViewRole() == role)){
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
      case 'reserve': this.onSubmitReserve(form); break;
      case 'affectEtudiant': this.onSubmitAffectEtudiant(form); break;
      case 'affectTuteur': this.onSubmitAffectTuteur(form); break;
      case 'affectRapporteur': this.onSubmitAffectRapporteur(form); break;
      default:
        break;
    }
  }
 
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
    // si l'utilisateur qui à créer le stage est un étudiant et que le stage est validé alors le stage est réservé à l'étudiant
    if(newState == "valide" && this.isEtudiant(this.stage?.ajouteur?._id)){
      newState = 'reserve'; // on passe à l'état réservé
    }
    this.stageService.editState(this.stage._id, newState, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("L'état du stage "+ this.stage.titre + " est passé à ["+newState+"] !");
        this.stage.etat = newState;
        if( (this.stage.etat == 'valide') || (this.stage.etat == 'reserve')){
          this.stage.dateValide = new Date();
        }
      });
  }

  isEtudiant(id:any):boolean{
    // si il ne trouve pas l'ajouteur dans la liste des étudiants alors ce n'est pas un étudiant
    return this.allEtudiant.some(((obj: { _id: any; }) => obj._id == id ));
  }

}
