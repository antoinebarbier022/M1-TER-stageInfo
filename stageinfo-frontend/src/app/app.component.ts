import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stageinfo';
  sidebar = true;

  displaySidebar(value :boolean){
    this.sidebar = value;
  }
  
  fullpage():boolean{
    return false;
  }

}
