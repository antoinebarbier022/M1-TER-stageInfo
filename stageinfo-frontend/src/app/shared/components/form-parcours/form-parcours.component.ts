import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-parcours',
  templateUrl: './form-parcours.component.html',
  styleUrls: ['./form-parcours.component.scss']
})
export class FormParcoursComponent implements OnInit {
  @Input() title: string ="";

  @Input() addParcours: boolean=false;
  @Input() editParcours: boolean=false;
  @Input() viewParcours: boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
