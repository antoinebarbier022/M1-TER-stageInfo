import { Component, OnInit } from '@angular/core';
import {concat} from "rxjs";
import {AllStagesResolver} from "../../core/resolves/all-stages.resolver";
import {ActivatedRoute, Router} from "@angular/router";
import { CsvDataService } from 'src/app/core/services/CsvDataService';
import {forEach} from "ol/geom/flat/segments";


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

 Allstage : any
  constructor(private route:ActivatedRoute) {  }

  ngOnInit(): void {
    this.Allstage = this.route.snapshot.data.stages;
  // @ts-ignore
    document.getElementById("export").addEventListener('click',() => {this.onSubmit()});
  }

   onSubmit(){
   console.log(this.Allstage)
     const datastage = new Array();
   var j=0;
for( var i =0;i<this.Allstage.length;i++){
  if(this.Allstage[i].etudiant !=null) {
    datastage[j] = {numetudiant: this.Allstage[i]?.etudiant?.numeroEtudiant,note:this.Allstage[i]?.noteStage?.valeur};
    j++;
  }
}
console.log(datastage)
  //CsvDataService.exportToCsv('test.csv', datastage);
}
}
