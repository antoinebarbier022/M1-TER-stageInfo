import { Component, Input, OnInit } from '@angular/core';
import { EtatStage } from 'src/app/core/enums/EtatStage';

@Component({
  selector: 'app-state-badge',
  templateUrl: './state-badge.component.html',
  styleUrls: ['./state-badge.component.scss']
})
export class StateBadgeComponent implements OnInit {
  @Input() state : string = "";
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  stateColor(state:string):string{
    return "state-"+state;
  }

  fullStateName(){
    switch (this.state) {
      case EtatStage.VALIDE:
        return "Validé";
        case EtatStage.PROPOSE:
          return "Proposé";
          case EtatStage.REFUSE:
            return "Refusé";
          case EtatStage.TERMINE:
            return "Terminé";
          case EtatStage.RESERVE:
            return "Reservé";
          case EtatStage.AFFECT_ETUDIANT:
            return "Étudiant affecté";
          case EtatStage.AFFECT_TUTEUR:
            return "Tuteur affecté";
          case EtatStage.AFFECT_RAPPORTEUR:
            return "Rapporteur affecté";
    
      default:
        return "Non définie";
    }
  }
}
