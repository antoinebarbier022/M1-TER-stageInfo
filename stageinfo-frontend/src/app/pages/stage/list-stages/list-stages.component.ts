import { Component, OnChanges, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StageService } from 'src/app/core/services/stage.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent implements OnInit {

  public visibleProperties = ['titre', 'entreprise.nomComplet', 'parcours.nomComplet', 'duree', 'etat'];

  public allStages: Array<any> = new Array();

  public searchFilter: string = "";
  public arrayFilter: Array<string> = [];

  public nbrEntries: number = 20; // Nombre de stage pour une page donnée

  public pageCount: number = 0; // Nombre total de page

  public currentPage: number = 1; // Page actuelle 
  public lastPage: number = this.currentPage; // Page précédente

  public startIndex: number = 0;
  public endIndex: number = this.startIndex + this.nbrEntries;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService: StageService, private auth: AuthService) {}

  ngOnInit(): void {
    this.stageService.getStages().subscribe(stages => {
      this.allStages = stages;
      this.pageCount = Math.ceil(this.allStages.length / this.nbrEntries);
    })
  }

  setNumberEntries(nbr : any){
    this.nbrEntries = parseInt(nbr.target.value);
    this.endIndex = this.startIndex + this.nbrEntries;

    this.pageCount = Math.ceil(this.allStages.length / this.nbrEntries);
    this.lastPage = this.pageCount;
    
    this.currentPage = 1;
    this.startIndex = 0;
    this.endIndex = this.startIndex + this.nbrEntries;

    console.log("startIndex : " + this.startIndex);
    console.log("endIndex : " + this.endIndex);

    this.getStagesByKeyword();
  }

  /* Récupère tous les stages */
  getStages() {
    this.stageService.getStages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_stages: any[]) => {
        this.allStages = _stages;
        console.log(this.allStages);
      });
  }

  stageHasAllKeywords(stage: any, str: string[]): boolean {

    
    let keywords = str.filter(e => e).map(v => v.toLowerCase());

    /*
    let includeKeyword = [];
    //console.log(keywords);

    if(Array.isArray(keywords) && keywords.length){

      //console.log("salut2");
      //console.log(keywords);

      for(let [key, value] of new Map(Object.entries(stage))){
        if(this.visibleProperties.includes(key)){
          if(typeof value === 'object' && value !== null){
            for(let [k, v] of new Map(Object.entries(value))){
              //console.log("salut3");
              for(let word of keywords){
                if(v.toLowerCase().includes(word)) 
                  includeKeyword.push(true);
                else
                  includeKeyword.push(false);
                //console.log("word : " + word + " | " + " v : " + v.toLowerCase());
              }
            }
          }
          else{
            if(typeof value === 'string'){
              for(let word of keywords){
                if(value.toLowerCase().includes(word)) 
                  includeKeyword.push(true);
                else
                  includeKeyword.push(false);
                //console.log("word : " + word + " | " + " v : " + value.toLowerCase());
                //console.log('e'.includes(value.toLowerCase()));
              }
            }
          }
        }
      }
    }
    else{
      //console.log("salut");
      return true;
    }
    
    console.log(includeKeyword);
    */

    /*
    Object.entries(stage).forEach(([key, value]) => {
      if(this.visibleProperties.includes(key)){
        if(typeof value === 'object' && value !== null){
          Object.entries(value).forEach(([k, v]) => {
            if(!keywords.includes(v))
              result = true;
          });
        }
        else{
          if(typeof value === 'string' && !keywords.includes(value))
            result = true;
        }
      }
    });
    */

    /*
    for (let x of str) {
      if (!(stage.titre.toLowerCase().includes(x.toLowerCase()) || stage.entreprise.nomComplet.toLowerCase().includes(x.toLowerCase()) || stage.parcours.nomComplet.toLowerCase().includes(x.toLowerCase())))
        return false;
    }
    */


    return false;
  }

  getStagesByKeyword() {
    this.arrayFilter = this.searchFilter.trim().split(/\s+/);

    return this.allStages.slice(this.startIndex, this.endIndex).filter(x => {
      if (this.stageHasAllKeywords(x, this.arrayFilter)) return x;
    });
  }

  onClickPageNumber(nbr: number) {
    console.log("click on : " + nbr);

    this.lastPage = this.currentPage;
    this.currentPage = nbr;

    if (this.lastPage < this.currentPage) {
      let difference = this.currentPage - this.lastPage;
      this.startIndex += this.nbrEntries * difference;
    }
    else {
      let difference = this.lastPage - this.currentPage;
      this.startIndex -= this.nbrEntries * difference;
    }

    this.endIndex = this.startIndex + this.nbrEntries;
    this.getStagesByKeyword();

    console.log("startIndex : " + this.startIndex);
    console.log("endIndex : " + this.endIndex);
  }

  onClickNextPage() {
    console.log("next");
    if (this.currentPage + 1 <= this.pageCount) {
      this.lastPage = this.currentPage;
      this.currentPage++;
      this.startIndex += this.nbrEntries;
      this.endIndex = this.startIndex + this.nbrEntries;

      this.getStagesByKeyword();
    }
  }

  onClickPreviousPage() {
    console.log("previous");
    if (this.currentPage - 1 > 0) {
      this.lastPage = this.currentPage;
      this.currentPage--;
      this.startIndex -= this.nbrEntries;
      this.endIndex = this.startIndex + this.nbrEntries;

      this.getStagesByKeyword();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
