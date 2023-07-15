import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Speacker } from '../speacker-model';
import { SpeackerService } from '../speacker-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-speacker-edit',
  templateUrl: './speacker-edit.component.html',
  styleUrls: ['./speacker-edit.component.css']
})
export class SpeackerEditComponent {


  id : number;
  spec : Speacker = new Speacker();

  itemForm: FormGroup;


  constructor(private specService : SpeackerService,
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

    this.specService.getSpeackerId(this.id).subscribe ({
      next :data => { 
        this.spec = data;

        this.itemForm.patchValue({
          name: this.spec.name,
          price: this.spec.price,
          details: this.spec.details,
          imageUrl: this.spec.imageUrl
        });

      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.specService.updateSpeacker(this.id, this.spec).subscribe( {
        next : data =>{
        this.goToSpeacker();
      },
      error :error => console.log(error)});
    }

    goToSpeacker(){
      this.router.navigate(['admin/speacker']);
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
