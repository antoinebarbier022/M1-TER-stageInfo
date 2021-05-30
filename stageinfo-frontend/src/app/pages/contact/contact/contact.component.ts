import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // @ts-ignore
  contactForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initContactComment();
  
  }
  initContactComment(){
    this.contactForm = this.formBuilder.group({
      message:['', Validators.required]
    });
  }

  envoyerMessage(){
    const formValue = this.contactForm.value;
    var message :any = {
      dateMessage: new Date(),
      message: formValue['message'],
    };
    /**
     * 
     * TO DO !
     */
  }


}
