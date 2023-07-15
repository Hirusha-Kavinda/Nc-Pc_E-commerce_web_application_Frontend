import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Memory } from '../memory-model';
import { MemoryService } from '../memory-service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-memory-create',
  templateUrl: './memory-create.component.html',
  styleUrls: ['./memory-create.component.css']
})
export class MemoryCreateComponent {

  memory: Memory = new Memory();

  itemForm: FormGroup;

  constructor(private memoryService : MemoryService,
    private router : Router ,
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
   this.memoryService.createNewMemory(this.memory).subscribe({ next :
  data => {
    console.log(data);
    this.goToMemory();
  },
   error : error => console.log(error)
  });}

goToMemory(){
      this.router.navigate(['admin/memory'])}

onSubmit(){
  this.memory.categoryID = 500;
     console.log(this.memory);
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
