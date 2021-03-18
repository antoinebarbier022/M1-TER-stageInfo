import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-stage',
  templateUrl: './info-stage.component.html',
  styleUrls: ['./info-stage.component.scss']
})
export class InfoStageComponent implements OnInit {
  stage : any;

  comments = [
    { idUser:"1",
      author:"Antoine", 
      date:"05/04/2018", 
      content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem a, ex voluptates aut saepe culpa, porro deserunt assumenda id quibusdam temporibus molestias quia, accusantium adipisci quasi voluptatem. Architecto, quibusdam asperiores?"
  },
  { 
    idUser:"1",
    author:"Henry", 
    date:"01/01/2021", 
    content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem a, ex voluptates aut saepe culpa, porro deserunt assumenda id quibusdam temporibus molestias quia, accusantium adipisci quasi voluptatem. Architecto, quibusdam asperiores?"
}];


  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.stage = this.route.snapshot.data.stage;  
  }

}
