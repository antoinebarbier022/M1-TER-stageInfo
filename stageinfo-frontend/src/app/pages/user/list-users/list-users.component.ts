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

  public readonly title: string = "Liste des utilisateurs";

  public visibleProperties = 
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

  public allUsers: Array<any>;

  public commonProperties: {
    searchFilter: string,
    nbrEntries: number,
    pageCount: number,
    currentPage: number,
    lastpage: number,
    startIndex: number,
    endIndex: number,

    sizeFilteredArray: number
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute, private userService: UserService) { 
    this.allUsers = new Array();

    this.commonProperties = {
      searchFilter: '',
      nbrEntries: 10,
      pageCount: 1,
      currentPage: 1,
      lastpage: 1,
      startIndex: 0,
      endIndex: 10,
      sizeFilteredArray: 0
    }
  }

  ngOnInit(): void {
    this.allUsers = this.route.snapshot.data.users; 
    //this.getUsers();
  }

  compare(obj1: any, obj2: any, index: number) : number {
    if(this.getNestedValue(obj1, this.visibleProperties[index].name) > this.getNestedValue(obj2, this.visibleProperties[index].name))
      return 1;

    if(this.getNestedValue(obj2, this.visibleProperties[index].name) > this.getNestedValue(obj1, this.visibleProperties[index].name))
      return -1;
    
    return 0;
  }

  sortByAscendingDescendingOrder(index: number){
    if(this.visibleProperties[index].sorted){
      this.allUsers.sort((stage1, stage2) => (-1)*this.compare(stage1, stage2, index));
      this.visibleProperties[index].sorted = false;
    }
    else{
      this.allUsers.sort((stage1, stage2) => (1)*this.compare(stage1, stage2, index));
      this.visibleProperties[index].sorted = true;
    }
  }

  getNestedValue(obj: any, key : any): any{
    return key.split(".").reduce(function(result: any, key: any) {
       return result[key] 
    }, obj);
  }

  stageHasAllKeywords(stage: any, str: string[]): boolean {
    const keywords = str.filter(e => e).map(v => v.toLowerCase());

    let row = new Array();
    
    this.visibleProperties.forEach(prop => {
      row.push(this.getNestedValue(stage, prop.name));
    });
    
    return keywords.every(word => row.join(' ').toLowerCase().includes(word));
  }

  printStages() : any {
    let filteredArray = this.allUsers.filter(x => {
      if (this.stageHasAllKeywords(x, this.commonProperties.searchFilter.trim().split(/\s+/))) return x;
    });

    console.log('ok : ');
    console.log(filteredArray);

    this.commonProperties.sizeFilteredArray = filteredArray.length;
    this.commonProperties.pageCount = Math.ceil(filteredArray.length / this.commonProperties.nbrEntries);
    
    if(this.commonProperties.currentPage > this.commonProperties.pageCount){
      this.commonProperties.currentPage = 1;
      this.commonProperties.startIndex = 0;
      this.commonProperties.endIndex = this.commonProperties.startIndex+this.commonProperties.nbrEntries;
    }

    return filteredArray.slice(this.commonProperties.startIndex, this.commonProperties.endIndex);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_users: any[]) => {
        this.allUsers = _users;
      }
    );
  }

}
