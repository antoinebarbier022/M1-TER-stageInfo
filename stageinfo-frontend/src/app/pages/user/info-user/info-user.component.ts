import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  userId:any;

  constructor(private route:ActivatedRoute) { 
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
  }

}
