import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-entreprise',
  templateUrl: './info-entreprise.component.html',
  styleUrls: ['./info-entreprise.component.scss']
})
export class InfoEntrepriseComponent implements OnInit {
  title = "Profile de l'entreprise : "
  constructor() { }

  ngOnInit(): void {
  }

}