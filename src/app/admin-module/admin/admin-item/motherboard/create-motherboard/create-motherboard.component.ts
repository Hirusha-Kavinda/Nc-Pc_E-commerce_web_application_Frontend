import { Component, OnInit } from '@angular/core';
import { Motherboard } from '../motherboard.model';
import { MotherboardService } from '../motherboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-motherboard',
  templateUrl: './create-motherboard.component.html',
  styleUrls: ['./create-motherboard.component.css']
})
export class CreateMotherboardComponent implements OnInit{


  motherboard: Motherboard = new Motherboard();

  itemForm: FormGroup;


  constructor(private MotherboardService : MotherboardService, private formBuilder: FormBuilder,
    private router : Router){

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
  
  saveMotherboard(){
   this.MotherboardService.createNewMotherboard(this.motherboard).subscribe({ next :
  data => {
    console.log(data);
    this.goToMotherboard();
  },
   error : error => console.log(error)
  });}

goToMotherboard(){
      this.router.navigate(['admin/motherboard'])}

onSubmit(){
     this.motherboard.categoryID = 200;
     console.log(this.motherboard);
     this.saveMotherboard();
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
