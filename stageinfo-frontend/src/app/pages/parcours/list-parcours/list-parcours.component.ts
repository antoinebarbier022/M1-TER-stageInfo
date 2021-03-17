import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-parcours',
  templateUrl: './list-parcours.component.html',
  styleUrls: ['./list-parcours.component.scss']
})
export class ListParcoursComponent implements OnInit {
  title="Liste des parcours"

  allParcours = [
    {
      acronyme:"AIglE", 
      intitule:"Architecture et ingénierie du logiciel et du web",
      niveau:"Master 1", 
      description:"...",
      responsable:"Pierre pompidor"
    },
    {
        acronyme:"MIT", 
      intitule:"Maths Informatique",
      niveau:"Master 1", 
      description:"...",
      responsable:"inconnu"
    },
    {
      acronyme:"Imagina", 
      intitule:"Images et Jeux vidéos",
      niveau:"Master 1", 
      description:"...",
      responsable:"inconnu"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
