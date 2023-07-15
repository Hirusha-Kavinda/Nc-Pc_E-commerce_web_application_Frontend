import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Psu } from '../psu-model';
import { Router } from '@angular/router';
import { PsuService } from '../psu-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-psu-create',
  templateUrl: './psu-create.component.html',
  styleUrls: ['./psu-create.component.css']
})
export class PsuCreateComponent {

  psu: Psu = new Psu();

  itemForm: FormGroup;


  constructor(private psuService : PsuService,
    private router : Router , private formBuilder: FormBuilder){

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
  
  savePsu(){
   this.psuService.createNewPsu(this.psu).subscribe({ next :
  data => {
    console.log(data);
    this.goToPsu();
  },
   error : error => console.log(error)
  });}

goToPsu(){
      this.router.navigate(['admin/psu'])}

onSubmit(){
     this.psu.categoryID = 800;
     console.log(this.psu);
     this.savePsu();
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
