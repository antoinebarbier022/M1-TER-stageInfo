import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-stage',
  templateUrl: './info-stage.component.html',
  styleUrls: ['./info-stage.component.scss']
})
export class InfoStageComponent implements OnInit {
  title="Stage : Nom du stage"
  constructor() { }

  ngOnInit(): void {
  }

}
