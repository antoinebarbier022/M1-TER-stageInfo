import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-entreprise',
  templateUrl: './form-entreprise.component.html',
  styleUrls: ['./form-entreprise.component.scss']
})
export class FormEntrepriseComponent implements OnInit {
  @Input() addEntreprise: boolean = false;
  @Input() editEntreprise: boolean = false;
  @Input() viewEntreprise: boolean = false;

  @Input() title: string = "";

  page :number = 1;
  nbMaxPage :number = 4;

  entreprise = {
    nom :"toto",
    prenom :"mateo",
    email :"titi@gmail.com",
    telephone :"089098",
    fax :"83839200",
    hash :"ndjcndj",
    role :"Admin",
    
    //etudiant
    numeroEtudiant :"12345689",
    promotion :"2019/2020",
    parcours :"M2 IMAGINA",
    
    // representant_entreprise
    fonction :"dj",
    entreprise :"dk",
  };

  constructor() { }

  ngOnInit(): void {
  }


  displayFielset(theme : string) : boolean{
    console.log(theme);
    switch (theme) {
      case "entreprise": //page 1
        return this.page === 1 ? true : false;
      case "adresse": // page 2
        return this.page === 2 ? true : false;
      case "contact": // page 3
        return this.page === 3 ? true : false;
      case "informations": // page 4
        return this.page === 4 ? true : false;
      default:
        return false;
    }
  }

  isDone(theme : string) : boolean{
    console.log(theme);
    switch (theme) {
      case "entreprise": //page 1
        return this.page >= 1 ? true : false;
      case "adresse": // page 2
        return this.page >= 2 ? true : false;
      case "contact": // page 3
        return this.page >= 3 ? true : false;
      case "informations": // page 4
        return this.page >= 4 ? true : false;
      default:
        return false;
    }
  }

  next(){
    if(this.page < this.nbMaxPage){
      this.page++;
    }
  }
  pred(){
    if(this.page > 1){
      this.page--;
    }
  }

  lastPage() :boolean {
    if(this.page == this.nbMaxPage){
      return true;
    }else{
      return false;
    }
  }
  firstPage() :boolean {
    if(this.page <= 1){
      return true;
    }else{
      return false;
    }
  }

}
