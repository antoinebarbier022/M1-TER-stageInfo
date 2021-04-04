import { Component, Input, OnInit } from '@angular/core';

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
      case "valide":
        return "Validé";
        case "propose":
          return "Proposé";
          case "refuse":
            return "Refusé";
          case "termine":
            return "Terminé";
          case "reserve":
            return "Reservé";
          case "affectEtudiant":
            return "Affecté à un étudiant";
          case "affectTuteur":
            return "Affecté à un tuteur";
          case "affectRapporteur":
            return "Affecté à un étudiant";
    
      default:
        return "Undefined";
    }
  }
}
