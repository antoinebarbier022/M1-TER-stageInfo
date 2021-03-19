import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent extends CommonListingTable implements OnInit, OnDestroy {

  public readonly title: string = "Liste des utilisateurs";

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute, private userService: UserService) { 
    super();
    this.visibleProperties = 
    [
      {
        name: 'nom',
        sorted: false
      },
      {
        name: 'prenom',
        sorted: false
      },
      {
        name: 'email',
        sorted: false
      },
      {
        name: 'role',
        sorted: false
      }
    ];
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.users; 
  }

  deleteParcours(id:any){
    console.log("Supprimer l'utilisateur : "+ id);
    /*this.userService.deleteUser(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.users = this.users.filter((object: { _id: any; }) => { return object._id != id; });
      });*/
  }

  getUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_users: any[]) => {
        this.allItems = _users;
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
