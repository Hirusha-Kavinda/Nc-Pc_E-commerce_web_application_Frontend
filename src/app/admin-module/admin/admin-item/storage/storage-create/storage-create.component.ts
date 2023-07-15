import { Component } from '@angular/core';
import { StorageService } from '../storage-service';
import { Router } from '@angular/router';
import { Storage } from '../storage-model';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})
export class StorageCreateComponent {


   str : Storage = new Storage();

   itemForm: FormGroup;


  constructor(private StrService : StorageService,
    private router : Router,
    private formBuilder: FormBuilder){

      this.itemForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        details: ['', Validators.required],
        imageUrl: ['', Validators.required],
      });

    }


  ngOnInit(): void {
    
  }


  //
  
  saveStorage(){
   this.StrService.createNewStorage(this.str).subscribe({ next :
  data => {
    console.log(data);
    this.goToStorage();
  },
   error : error => console.log(error)
  });}

goToStorage(){
      this.router.navigate(['admin/storage'])}

onSubmit(){
     this.str.categoryID = 600;
     console.log(this.str);
     this.saveStorage();
  }


  // alert message boxes

alertWithsuccess(){
  Swal.fire({ 
    
    title : "<h2 style='color:White'>" + 'Great !..' + "<br><br>"+"<h5 style='color:White'>"+ 'You Submitted successfully' +"</h5>" +   "</h2>",
   
    icon :'success',
    iconColor : '#3FCBFF',
    background : '#303A42',
  confirmButtonColor : '#2C8EB2'})
} 

}
