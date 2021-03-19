import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-add-modal',
  templateUrl: './button-add-modal.component.html',
  styleUrls: ['./button-add-modal.component.scss']
})
export class ButtonAddModalComponent implements OnInit {
  @Input() icon: string ="fas fa-plus";
  @Input() idModal :any;
  constructor() { }

  ngOnInit(): void {
  }

}
