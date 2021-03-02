import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  role = "aucun";
  monRole = "aucun";

  constructor(private testService: TestService) { 
    this.testService.setRole("etudiant");
  }

  ngOnInit(): void {
    this.monRole = this.testService.getRole();
  }

}
