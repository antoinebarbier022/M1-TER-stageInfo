import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StageService } from 'src/app/core/services/stage.service';

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

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private route:ActivatedRoute, 
              private stageService: StageService) { }

  ngOnInit(): void {
    this.stage = this.route.snapshot.data.stage;

    this.allUsers = this.route.snapshot.data.allUsers;
    var index = this.allUsers.findIndex(((obj: { _id: any; }) => obj._id == this.stage.entreprise?.representant));
    this.stage.entreprise.representant = {
      _id: this.stage.entreprise?.representant,
      nom: this.allUsers[index].nom,
      prenom: this.allUsers[index].prenom
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

  ajouterFichier(){
    this.stageService.editStageWithPdf(this.stage._id, this.stage, this.pdf)
        .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Stage : "+ this.stage.titre + " modifié !");
        });
  }

}

