import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Papa } from 'ngx-papaparse';
import {UserModel} from "src/app/core/models/UserModel";
import {takeUntil} from "rxjs/operators";
import {UserService} from "../../core/services/user.service";
import {Subject} from "rxjs";


@Component({
  selector: 'app-importation-csv',
  templateUrl: './importation-csv.component.html',
  styleUrls: ['./importation-csv.component.scss']
})
export class ImportationCsvComponent implements OnInit {
csv :any;
uploaded = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private isCSV_Valid: boolean | undefined;
  constructor(  private route: ActivatedRoute,
                private router: Router,
                private papa: Papa,
                private userService: UserService) { }

  ngOnInit(): void {
  }
 envoyer() {
   let reader: FileReader = new FileReader();
   reader.readAsText(this.csv, "UTF-8");
   reader.onload = ev => {
     const text = reader.result;
     const results = this.papa.parse(text as string, {header: false});
     if (results !== null && results !== undefined && results.data !== null &&
       results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
       this.isCSV_Valid = true;
       let csvTableHeader = results.data[0];

       let csvTableData = [...results.data.slice(1, results.data.length)];
       console.log( csvTableData[4])
       var i:number;
       for(i=4;i<csvTableData.length-1;i++) {
         const newUser = new UserModel(
           '',
           csvTableData[i][2],
           csvTableData[i][1],
           csvTableData[i][4],
           '',
           '',
           'testtest',
           'etudiant',
           csvTableData[i][0],
           '',
           null,
           '',
           null,
         );
         this.ajouterUser(newUser);
       }
     }
   }
 }
  fileChoosen(event: any) {
    if(event.target.value){
      this.csv=<File>event.target.files[0];
      this.uploaded =true;
    }
  }
  ajouterUser(user:any){
    this.userService.addUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log("User : "+ user.nom + " "+ user.prenom + " ajouté à la plateforme !");

      });
  }
}
