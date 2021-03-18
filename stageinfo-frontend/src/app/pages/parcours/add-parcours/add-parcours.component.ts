import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-parcours',
  templateUrl: './add-parcours.component.html',
  styleUrls: ['./add-parcours.component.scss']
})
export class AddParcoursComponent implements OnInit {
  title: string ="Ajouter un Parcours";
  constructor() { }

  ngOnInit(): void {
  }

}
