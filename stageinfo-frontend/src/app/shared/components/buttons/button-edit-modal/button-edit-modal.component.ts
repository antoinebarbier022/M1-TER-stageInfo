import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-edit-modal',
  templateUrl: './button-edit-modal.component.html',
  styleUrls: ['./button-edit-modal.component.scss']
})
export class ButtonEditModalComponent implements OnInit {
  @Input() link: string ="";
  @Input() idModal :any;
  constructor() { }

  ngOnInit(): void {
  }

}
