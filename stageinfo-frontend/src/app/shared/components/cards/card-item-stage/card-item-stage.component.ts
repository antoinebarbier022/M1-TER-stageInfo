import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-item-stage',
  templateUrl: './card-item-stage.component.html',
  styleUrls: ['./card-item-stage.component.scss']
})
export class CardItemStageComponent implements OnInit {
  @Input() title: string="";
  @Input() date: string="";
  @Input() state: string="";
  @Input() entreprise: string="";

  
  constructor() { }

  ngOnInit(): void {
  }

}
