import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.scss']
})
export class AddEntrepriseComponent implements OnInit {
  title = "Ajouter une entreprise"
  constructor() { }

  ngOnInit(): void {
  }

}
