import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Speacker } from '../speacker-model';
import { SpeackerService } from '../speacker-service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-speacker-create',
  templateUrl: './speacker-create.component.html',
  styleUrls: ['./speacker-create.component.css']
})
export class SpeackerCreateComponent {


  spec: Speacker = new Speacker();

  itemForm: FormGroup;


  constructor(private specService : SpeackerService,
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
  
  saveSpeacker(){
   this.specService.createNewSpeacker(this.spec).subscribe({ next :
  data => {
    console.log(data);
    this.goToSpeacker();
  },
   error : error => console.log(error)
  });}

goToSpeacker(){
      this.router.navigate(['admin/speacker'])}

onSubmit(){
     this.spec.categoryID = 700;
     console.log(this.spec);
     this.saveSpeacker();
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
