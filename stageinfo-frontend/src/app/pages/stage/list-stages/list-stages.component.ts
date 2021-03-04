import { Component, OnInit } from '@angular/core';
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
  public stages: Array<any> = new Array();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService:StageService, private auth:AuthService) { }

  ngOnInit(): void {

    this.auth.login("marcbigs1098@gmail.com", "Uxjr1412");

    this.stageService.getStages().subscribe(stages => {
      console.log(stages);
      this.stages = stages;
    })
  }

  getStages(){
    this.stageService.getStages()
    .pipe(takeUntil(this.destroy$))
      .subscribe((_stages: any[]) => {
        this.stages = _stages;
        console.log(this.stages);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
