import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  public users : any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data.users; 
    //this.getUsers();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
        this.users = _users;
      }
    );
  }

}
