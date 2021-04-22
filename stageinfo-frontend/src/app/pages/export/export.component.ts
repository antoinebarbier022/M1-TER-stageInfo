import { Component, OnInit } from '@angular/core';
import {concat} from "rxjs";
import {AllStagesResolver} from "../../core/resolves/all-stages.resolver";
import {ActivatedRoute, Router} from "@angular/router";
import { CsvDataService } from 'src/app/core/services/CsvDataService';


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
  CsvDataService.exportToCsv('test.csv', this.Allstage);
}
}
