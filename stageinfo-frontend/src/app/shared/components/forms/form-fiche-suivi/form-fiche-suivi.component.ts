import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-fiche-suivi',
  templateUrl: './form-fiche-suivi.component.html',
  styleUrls: ['./form-fiche-suivi.component.scss']
})
export class FormFicheSuiviComponent implements OnInit {

  public readonly title: string = "Fiche de suivi";
  niveau = ["M2", "M1", "L3"];
  contact = ["Téléphone", "Mail", "Visite"];
  allParcours:any;
  allUsers: Array<any>;

  public model: any;

  constructor(private route: ActivatedRoute) { 
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allUsers = this.route.snapshot.data.allUsers;
    console.log(this.allUsers);
  }

  ngOnInit(): void {
  }

  /*
  formatter = (result: string) => result.toUpperCase();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.allUsers.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
  */

}
