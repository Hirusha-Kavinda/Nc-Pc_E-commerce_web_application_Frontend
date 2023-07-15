import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Memory } from '../memory-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoryService } from '../memory-service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-memory-edit',
  templateUrl: './memory-edit.component.html',
  styleUrls: ['./memory-edit.component.css']
})
export class MemoryEditComponent {
  id : number;
  memory: Memory = new Memory();
  
  itemForm: FormGroup;


  constructor(private memoryService : MemoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder){

      this.itemForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        details: ['', Validators.required],
        imageUrl: ['', Validators.required]
      });
    

    }
 

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.memoryService.getMemoryId(this.id).subscribe ({
      next :data => { 
        this.memory = data;
        this.itemForm.patchValue({
          name: this.memory.name,
          price: this.memory.price,
          details: this.memory.details,
          imageUrl: this.memory.imageUrl
        });
      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.memoryService.updateMemory(this.id, this.memory).subscribe( {
        next : data =>{
        this.goToMotherboard();
      },
      error :error => console.log(error)});
    }

    goToMotherboard(){
      this.router.navigate(['admin/memory']);
    }


     // alert box

 alertWithsuccess(){
  Swal.fire({ 
    
    title : "<h2 style='color:White'>" + 'Great !..' + "<br><br>"+"<h5 style='color:White'>"+ 'You Update successfully' +"</h5>" +   "</h2>",
   
    icon :'success',
    iconColor : '#3FCBFF',
    background : '#303A42',
  confirmButtonColor : '#2C8EB2'})
} 


}
