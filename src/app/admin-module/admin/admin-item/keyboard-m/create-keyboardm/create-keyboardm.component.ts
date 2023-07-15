import { Component } from '@angular/core';
import { KeyboardM } from '../keyboard-m-model';
import { KeyboardMService } from '../keyboard-m-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-keyboardm',
  templateUrl: './create-keyboardm.component.html',
  styleUrls: ['./create-keyboardm.component.css']
})
export class CreateKeyboardmComponent {
  keym : KeyboardM = new KeyboardM();

  itemForm: FormGroup;


  constructor( private keymService : KeyboardMService , private router : Router , private formBuilder: FormBuilder){ 

    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      details: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

   }

    ngOnInit() {
    
    }

  saveKeyM(){
    this.keymService.createNewKeyboardM(this.keym ).subscribe({ next :
   data => {
     console.log(data);
     //this.goToMotherboard();
   },
    error : error => console.log(error)
   });}
 
 goToKeyM(){
       this.router.navigate(['admin/keyboardmouse'])}

       
 
 onSubmit(){
  
  this.keym .categoryID = 900;
      console.log(this.keym );
      this.saveKeyM();
   }

   alertWithsuccess(){
    Swal.fire({ 
      
      title : "<h2 style='color:White'>" + 'Great !..' + "<br><br>"+"<h5 style='color:White'>"+ 'You Submitted successfully' +"</h5>" +   "</h2>",
     
      icon :'success',
      iconColor : '#3FCBFF',
      background : '#303A42',
    confirmButtonColor : '#2C8EB2'})
  } 

}
