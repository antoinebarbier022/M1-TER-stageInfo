import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  monRole = "invite";

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.monRole = this.testService.getRole();
  }

  setRole(role:string){
    this.monRole = role;
    this.testService.setRole(role);
  }

}
