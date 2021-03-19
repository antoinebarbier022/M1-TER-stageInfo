import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-delete-modal',
  templateUrl: './button-delete-modal.component.html',
  styleUrls: ['./button-delete-modal.component.scss']
})
export class ButtonDeleteModalComponent implements OnInit {
  @Input() idModal :any;
  constructor() { }

  ngOnInit(): void {
  }

}
