import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { IToken } from '../../shared/interfaces/itoken';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  private auth: AuthService;
  private router: Router

  constructor(authService: AuthService, private route: Router){
    this.auth = authService;
    this.router = route;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const decodedToken = jwtDecode<IToken>(this.auth.getJwtToken() || '');
    const role = decodedToken.role;
    const path = route.url[0].path;

    if(this.checkRoleAccess(role, path)) {
      return true;
    }
    else{
      this.router.navigateByUrl('error401');
    }

    return false;
  }

  checkRoleAccess(role: string, route: string){

    /* ['etudiant', 'representantEntreprise', 'tuteur', 'secretaire', 'responsableParcours', 'responsablePedagogique', 'admin', 'invite'] */

    switch(route){
      case 'documentation':
        return ['tuteurUniversite', 'responsableParcours', 'admin'].includes(role);
      case 'liste-stages':
        return ['etudiant', 'representantEntreprise', 'tuteur', 'secretaire', 'responsableParcours', 'responsablePedagogique', 'admin', 'invite'].includes(role);
      case 'liste-stages/:id':
        return ['etudiant', 'representantEntreprise', 'tuteur', 'secretaire', 'responsableParcours', 'responsablePedagogique', 'admin', 'invite'].includes(role);
      case 'saisir-stage':
        return ['etudiant', 'representantEntreprise', 'tuteur', 'secretaire', 'admin'].includes(role);
      case 'liste-utilisateurs':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-etudiants':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-utilisateurs/import-users':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-utilisateurs/add-user':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-utilisateurs/edit-user/:id':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-utilisateurs/edit-user-v2':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-utilisateurs/user/:id':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-entreprises':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-entreprises/add-entreprise':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-entreprises/edit-entreprise/:id':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-entreprises/info/:id':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-soutenances':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-soutenances/add-soutenance':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-soutenances/edit-soutenance':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-soutenances/soutenance':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-parcours':
        return ['secretaire', 'responsableParcours', 'admin'].includes(role);
      case 'liste-parcours/add-parcours':
        return ['secretaire', 'admin'].includes(role);
      case 'liste-parcours/edit-parcours/:id':
        return ['secretaire', 'responsableParcours', 'admin'].includes(role);
      case 'liste-parcours/info/:id':
        return ['secretaire', 'responsableParcours', 'admin'].includes(role);
      default:
        return false;
    }
  }
  
}