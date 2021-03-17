import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss']
})
export class ButtonAddComponent implements OnInit {
  @Input() name: string ="Ajouter";
  @Input() icon: string ="fas fa-plus";
  @Input() link: string ="/";
  constructor() { }

  ngOnInit(): void {
  }

}
