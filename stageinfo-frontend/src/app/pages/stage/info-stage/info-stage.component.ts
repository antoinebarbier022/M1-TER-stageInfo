import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StageService } from 'src/app/core/services/stage.service';

@Component({
  selector: 'app-info-stage',
  templateUrl: './info-stage.component.html',
  styleUrls: ['./info-stage.component.scss']
})
export class InfoStageComponent implements OnInit, OnDestroy {
  title="Stage : Nom du stage";

  stageId :string | null = "";
  stage : any;

  comments = [{ author:"Antoine", 
    date:"05/04/2018", 
    content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem a, ex voluptates aut saepe culpa, porro deserunt assumenda id quibusdam temporibus molestias quia, accusantium adipisci quasi voluptatem. Architecto, quibusdam asperiores?"
  },
  { author:"Henry", 
  date:"05/04/2018", 
  content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem a, ex voluptates aut saepe culpa, porro deserunt assumenda id quibusdam temporibus molestias quia, accusantium adipisci quasi voluptatem. Architecto, quibusdam asperiores?"
}];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute,
              private stageService: StageService) { 
  }

  ngOnInit(): void {
    this.stageId = this.route.snapshot.paramMap.get('id');
    this.getStage(this.stageId);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getStage(id:any) {
    this.stageService.getStageById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_stage: any[]) => {
        this.stage = _stage;
      }
    );
  }

}
