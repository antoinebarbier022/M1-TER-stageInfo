import { Component, Input, OnInit } from '@angular/core';
import { RoleUser } from 'src/app/core/enums/RoleUser';

@Component({
  selector: 'app-role-badge',
  templateUrl: './role-badge.component.html',
  styleUrls: ['./role-badge.component.scss']
})
export class RoleBadgeComponent implements OnInit {
  @Input() role : string = "";
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  roleColor(role:string):string{
    return "role-"+role;
  }

  fullRoleName(){
    switch (this.role) {
      case RoleUser.INVITE:
        return "Invité";
      case RoleUser.ETUDIANT:
        return "Étudiant";
      case RoleUser.TUTEUR:
        return "Tuteur";
      case RoleUser.REPRESENTANT_ENTREPRISE:
        return "Représentant entreprise";
      case RoleUser.RESPONSABLE_PARCOURS:
        return "Responsable parcours";
      case RoleUser.RESPONSABLE_PEDAGOGIQUE:
        return "Responsable pédagogique";
      case RoleUser.SECRETAIRE:
        return "Secrétaire";
      case RoleUser.ADMIN:
        return "Admin";
    
      default:
        return "Non définie";
    }
  }
}
