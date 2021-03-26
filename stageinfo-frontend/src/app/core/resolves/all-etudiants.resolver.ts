import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AllEtudiantsResolver implements Resolve<boolean> {
  constructor(private userService : UserService, private router: Router){}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    return this.userService.getAllUserByRole('etudiant').pipe(
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