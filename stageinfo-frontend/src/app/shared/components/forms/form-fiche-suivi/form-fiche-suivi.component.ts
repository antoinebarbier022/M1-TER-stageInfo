import { Component, OnInit } from '@angular/core';
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
  allUsers:any;

  constructor(private route: ActivatedRoute) { 
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allUsers = this.route.snapshot.data.allUsers;
    console.log(this.allUsers);
  }

  ngOnInit(): void {
  }

}
