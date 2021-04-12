import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleUser } from 'src/app/core/enums/RoleUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { StageService } from 'src/app/core/services/stage.service';
import { pjService } from "../../../core/services/pj.service";

@Component({
  selector: 'app-info-stage',
  templateUrl: './info-stage.component.html',
  styleUrls: ['./info-stage.component.scss']
})
export class InfoStageComponent implements OnInit, OnDestroy {
  stage : any;
  allUsers:any;
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:3000/upload"
    }
  };
  comments = [
    { idUser:"1",
      author:"Antoine",
      date:"05/04/2018",
      content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem a, ex voluptates aut saepe culpa, porro deserunt assumenda id quibusdam temporibus molestias quia, accusantium adipisci quasi voluptatem. Architecto, quibusdam asperiores?"
  },
  {
    idUser:"1",
    author:"Henry",
    date:"01/01/2021",
    content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem a, ex voluptates aut saepe culpa, porro deserunt assumenda id quibusdam temporibus molestias quia, accusantium adipisci quasi voluptatem. Architecto, quibusdam asperiores?"
}];
  lien: any;


  // variables pour le download/upload de fichiers
  pdf : any;
  uploaded = false;
  pj : Array<any> = new Array();
  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorMessage: boolean = false;
  alert: any;

  selectPieceJointe:any; // piece jointe qui est selectionné 
  selectComment:any;

  // formulaire d'ajout de commentaire sur le stage
  // @ts-ignore
  commentaireForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private stageService: StageService,
              private authService: AuthService,
              private pjService : pjService) { 
                this.allUsers = this.route.snapshot.data.allUsers;
              }

  ngOnInit(): void {
    this.initFormComment();
    this.stage = this.route.snapshot.data.stage;
    console.log(this.stage);

    var index = this.allUsers.findIndex(((obj: { _id: any; }) => obj._id == this.stage.entreprise?.representant));
    this.stage.entreprise.representant = {
      _id: this.stage.entreprise?.representant,
      nom: this.allUsers[index]?.nom,
      prenom: this.allUsers[index]?.prenom
    }
  }

  initFormComment(){
    this.commentaireForm = this.formBuilder.group({
      commentaire:['',Validators.required]
    });
  }

  selectedPieceJointe(item:any){
    this.selectPieceJointe = item;
  }

  selectedComment(item:any){
    this.selectComment = item;
  }

  displaySectionEncadrant():boolean{
    return this.stage.tuteur;
  }

  canEditStage():boolean{
    switch (this.authService.getViewRole()) {
      case RoleUser.INVITE:
      case RoleUser.ETUDIANT:
      case RoleUser.TUTEUR:
      case RoleUser.REPRESENTANT_ENTREPRISE:
        return false;
      
      case RoleUser.RESPONSABLE_PARCOURS:
      case RoleUser.SECRETAIRE:
      case RoleUser.RESPONSABLE_STAGES:
      case RoleUser.ADMIN:
        return true;
      default:
        return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


  fileChoosen(event: any) {
    if(event.target.value){
      this.pdf=<File>event.target.files[0];
      this.uploaded =true;
      console.log(this.pdf);
    }
  }
  onSubmitAddFiles(){
    this.ajouterFichier();
  }

  ajouterCommentaire(){
    const formValue = this.commentaireForm.value;
    var comment :any = {
      idStage: this.stage._id,
      idUser: this.authService.getUserid(),
      dateCommentaire: new Date(),
      message: formValue['commentaire'],
    };
    this.stageService.addCommentOnStage(this.stage._id, comment)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Nouveau commentaire !");
          comment._id = _res?._id;
          this.stage.commentaires.push(comment);
          this.commentaireForm.reset();
        });
  }

  supprimerCommentaire(id:any){
    this.stageService.deleteCommentOnStage(this.stage._id, id)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Suppression du commentaire!");
          this.stage.commentaires = this.stage.commentaires.filter((object: { _id: any; }) => { return object._id != id; });
        });
  }

  getCommentAuthor(idUser:any){
    var index = this.allUsers.findIndex(((obj: { _id: any; }) => obj._id == idUser));
    return this.allUsers[index]?.nom + " " + this.allUsers[index]?.prenom;
  }

  ajouterFichier(){
    this.stageService.addPdf(this.stage._id, this.pdf)
        .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Stage : "+ this.stage.titre + " modifié !");
          this.alert= "Fichier ajoutée!";
        });
  }

  modifierFichier(_id: any) {
    if(this.uploaded) {
      this.pjService.editPJ(_id, this.pdf).pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Stage : " + this.stage.titre + " modifié !");
          this.alert= "Fichier modifié!";
        });
    }
    else{
      this.errorMessage=true
    }

  }

  supprimerFichier(id: any) {
    this.pjService.deletePJById(id).pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        this.alert="Fichier supprimé!";
        // On supprime la pièce jointe du tableau local des fichier (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.stage.fichier = this.stage.fichier.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }
}

