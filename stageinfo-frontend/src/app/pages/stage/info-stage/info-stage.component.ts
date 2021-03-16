import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StageService } from 'src/app/core/services/stage.service';

@Component({
  selector: 'app-info-stage',
  templateUrl: './info-stage.component.html',
  styleUrls: ['./info-stage.component.scss']
})
export class InfoStageComponent implements OnInit, OnDestroy {
  // récupération du contenu du stage
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
              private router: Router,
              private stageService: StageService) { 
  }

  ngOnInit(): void {
    this.getStage(this.route.snapshot.paramMap.get('id'));
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
      }, (_error:any) =>{
        // redirection vers la page d'erreur 404 si le stage n'est pas trouvé
        if(_error.status == "404"){
          this.router.navigate(['not-found']);
        }
      }
    );
  }

}
