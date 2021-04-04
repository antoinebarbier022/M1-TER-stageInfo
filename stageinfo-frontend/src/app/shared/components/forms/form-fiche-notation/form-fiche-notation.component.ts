import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-fiche-notation',
  templateUrl: './form-fiche-notation.component.html',
  styleUrls: ['./form-fiche-notation.component.scss']
})
export class FormFicheNotationComponent implements OnInit {

  public readonly title: string = "Fiche de notation";

  constructor() { }

  ngOnInit(): void {
  }

}
