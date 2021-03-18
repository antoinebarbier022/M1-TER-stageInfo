import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-parcours',
  templateUrl: './edit-parcours.component.html',
  styleUrls: ['./edit-parcours.component.scss']
})
export class EditParcoursComponent implements OnInit {
  title: string = "Modifier le parcours";
  constructor() { }

  ngOnInit(): void {
  }

}
