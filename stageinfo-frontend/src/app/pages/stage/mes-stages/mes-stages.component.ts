import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StageModel } from 'src/app/core/models/StageModel';

import { UserModel } from 'src/app/core/models/UserModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { StageService } from 'src/app/core/services/stage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-mes-stages',
  templateUrl: './mes-stages.component.html',
  styleUrls: ['./mes-stages.component.scss']
})
export class MesStagesComponent implements OnInit, OnDestroy {

    stages:any;
  
    destroy$: Subject<boolean> = new Subject<boolean>();
  
    constructor(private route:ActivatedRoute,
      private authService: AuthService,
      private stageService: StageService) {
  
        this.stages = Array<StageModel>();
    }
  
    ngOnInit(): void {
        // On récupère les données de l'utilisateur connecté
          // on récupère les données des stages associé à l'utilisateur connecté
          this.stageService.getAllStageRelatedUser(this.authService.getUserId())
            .pipe(takeUntil(this.destroy$))
              .subscribe((_res: UserModel) => {
                this.stages = _res;
          });

    }
  
  
    ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  

}
