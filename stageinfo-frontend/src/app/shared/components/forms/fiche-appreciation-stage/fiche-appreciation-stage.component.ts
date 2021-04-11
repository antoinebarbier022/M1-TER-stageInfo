import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiche-appreciation-stage',
  templateUrl: './fiche-appreciation-stage.component.html',
  styleUrls: ['./fiche-appreciation-stage.component.scss']
})
export class FicheAppreciationStageComponent implements OnInit {

  public readonly title: string = "Fiche d'appréciation du stage";

  constructor() { }

  ngOnInit(): void {
  }

}
