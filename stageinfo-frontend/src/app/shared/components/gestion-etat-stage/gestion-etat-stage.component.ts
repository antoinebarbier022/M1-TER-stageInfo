import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

    // pour pouvoir détruire les subscribes
    destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService:StageService, 
              private authService:AuthService) { 
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
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
