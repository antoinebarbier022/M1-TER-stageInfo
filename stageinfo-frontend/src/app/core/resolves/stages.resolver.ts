import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { StageService } from '../services/stage.service';

@Injectable({
  providedIn: 'root'
})
export class StagesResolver implements Resolve<any> {

  constructor(private stageService : StageService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
      return this.stageService.getStages().pipe(
        map(res => res),
        catchError((error) => {
          // redirection vers la page d'erreur 404 si le stage n'est pas trouvé
          if(error.status == "404"){
            this.router.navigate(['not-found']);
          }
          return of({ res: null, error: error });
        }),
      );
  }
}
