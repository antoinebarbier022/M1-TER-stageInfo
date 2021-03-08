import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user-v2',
  templateUrl: './edit-user-v2.component.html',
  styleUrls: ['./edit-user-v2.component.scss']
})
export class EditUserV2Component implements OnInit {

  isReadonly = true;
  constructor() { }

  ngOnInit(): void {
  }

}
