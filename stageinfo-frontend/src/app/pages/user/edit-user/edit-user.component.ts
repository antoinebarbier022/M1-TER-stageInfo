import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  title="Modifier l'utilisateur"
  userId:any;

  constructor(private route:ActivatedRoute) { 
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
  }

}
