import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Processor } from '../processor-model';
import { ProcessorService } from '../processor-service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-processor-create',
  templateUrl: './processor-create.component.html',
  styleUrls: ['./processor-create.component.css']
})
export class ProcessorCreateComponent {

processor: Processor = new Processor();
itemForm: FormGroup;



  constructor(private processorService : ProcessorService,
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
  
  saveMemory(){
   this.processorService.createNewProcessor(this.processor).subscribe({ next :
  data => {
    console.log(data);
    this.goToMemory();
  },
   error : error => console.log(error)
  });}

goToMemory(){
      this.router.navigate(['admin/processor'])}

onSubmit(){
  this.processor.categoryID = 300;
     console.log(this.processor);
     this.saveMemory();
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
