import { Component, OnChanges, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StageService } from 'src/app/core/services/stage.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent implements OnInit {

  // tableau d'objet pour stocker les stages
  public allStages: Array<any> = new Array();
  public filterStages: Array<any> = new Array();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService: StageService, private auth: AuthService) { }

  ngOnInit(): void {

    this.stageService.getStages().subscribe(stages => {
      this.allStages = stages;
      this.filterStages = stages;
    })
  }

  /* Récupère tous les stages */
  getStages() {
    this.stageService.getStages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_stages: any[]) => {
        this.allStages = _stages;
        console.log(this.allStages);
      });
  }

  stageHasKeyword(stage: any, str: string): boolean {

    str = str.toLowerCase()

    if(stage.titre.toLowerCase().includes(str) || stage.entreprise.nomComplet.toLowerCase().includes(str) || stage.parcours.nomComplet.toLowerCase().includes(str))
      return true;

    return false;
  }

  getStagesByKeyword(userInput: any) {

    let input = userInput.target.value;

    this.filterStages = this.allStages.filter(x => {
      if(this.stageHasKeyword(x, input)) return x;
    });

    console.log(this.filterStages);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
