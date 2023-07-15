import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Processor } from '../processor-model';
import { ProcessorService } from '../processor-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-processor-edit',
  templateUrl: './processor-edit.component.html',
  styleUrls: ['./processor-edit.component.css']
})
export class ProcessorEditComponent {
  id : number;
  processor : Processor = new Processor ();
  itemForm: FormGroup;

  constructor(private processorService : ProcessorService,
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

    this.processorService.getProcessorId(this.id).subscribe ({
      next :data => { 
        this.processor = data;
        this.itemForm.patchValue({
          name: this.processor.name,
          price: this.processor.price,
          details: this.processor.details,
          imageUrl: this.processor.imageUrl
        });
      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.processorService.updateProcessor(this.id, this.processor).subscribe( {
        next : data =>{
        this.goToMotherboard();
      },
      error :error => console.log(error)});
    }

    goToMotherboard(){
      this.router.navigate(['admin/processor']);
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
