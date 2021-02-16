import { Component, OnInit } from '@angular/core';

// import icons
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faCoffee = faCoffee;

  constructor() { }

  ngOnInit(): void {

  }

}
