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
