import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {CsvDataService} from "../../../core/services/CsvDataService";

@Component({
  selector: 'app-export-stage',
  templateUrl: './export-stage.component.html',
  styleUrls: ['./export-stage.component.scss']
})
export class ExportStageComponent implements OnInit {
  Allstage : any
  importForm: any;
  constructor(private route:ActivatedRoute,
              private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.Allstage = this.route.snapshot.data.stages;
    this.initForm()
  }
  initForm(){
    this.importForm = this.formBuilder.group({
      ann: ['',Validators.required],
    });
  }

  onSubmit(){
    const datastage = new Array();
    for( var i =0;i<this.Allstage.length;i++){

        datastage[i] = {titre:this.Allstage[i].titre,description:this.Allstage[i].description,duree:this.Allstage[i].duree,dateDebut:this.Allstage[i].dateDebut,parcours:this.Allstage[i].parcours.acronyme+' '+this.Allstage[i].parcours.niveau,entreprise:this.Allstage[i].entreprise.nom,ajouteur:this.Allstage[i].ajouteur.nom,note:this.Allstage[i].noteStage?.valeur};


    }
console.log(datastage)
    CsvDataService.exportToCsv('test.csv', datastage);
  }
}

