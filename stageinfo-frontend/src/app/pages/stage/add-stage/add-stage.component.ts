import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss']
})
export class AddStageComponent implements OnInit {
  title = "Nouveau stage";
  stage = {
    titre :"toto",
    description :"mateo",
    duree :"mateo",
    niveauRequis :"titi@gmail.com",
    parcours :"M2 IMAGINA",
    salaire:"",
    avantages:"",
    conditions:"",
    competences:"",
  };

  entreprise = {
    nom:"",
    adresse :	"",
    codePostal:"",
    ville : "",
    siteInternet :	"",
    description :	"",
    tel :	"", 
    fax : "",
    siret :""	,
    secteurActivité :	"",
    nbSalarier:""	,
    chiffreAffaire:""	,
    local:"" ,
  };

  niveauRequis = ["Licence 3", "Master 1", "Master 2"];
  parcours = ["M2 AIGLE", "M2 MIT","M2 DECOL", "M2 IMAGINA"];

  constructor() { }

  ngOnInit(): void {
  }

}
