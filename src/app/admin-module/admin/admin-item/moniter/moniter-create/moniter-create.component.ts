import { Component } from '@angular/core';
import { Moniter } from '../moniter-model';
import { MoniterService } from '../moniter-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-moniter-create',
  templateUrl: './moniter-create.component.html',
  styleUrls: ['./moniter-create.component.css']
})
export class MoniterCreateComponent {

  moniter: Moniter = new Moniter ();

  itemForm: FormGroup;


  constructor(private moniterService : MoniterService,
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
  
  saveMoniter(){
   this.moniterService.createNewMoniter(this.moniter).subscribe({ next :
  data => {
    console.log(data);
    this.goToMoniter();
  },
   error : error => console.log(error)
  });}

goToMoniter(){
      this.router.navigate(['admin/moniter'])}

onSubmit(){
  this.moniter.categoryID = 400;
     console.log(this.moniter);
     this.saveMoniter();
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
