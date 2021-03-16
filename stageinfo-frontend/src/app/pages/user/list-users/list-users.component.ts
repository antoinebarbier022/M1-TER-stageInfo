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

  getUsers() {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_users: any[]) => {
        this.users = _users;
      }
    );
  }

}
