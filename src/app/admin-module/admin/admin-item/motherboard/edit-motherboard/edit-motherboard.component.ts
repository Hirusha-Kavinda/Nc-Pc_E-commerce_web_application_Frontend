import { Component } from '@angular/core';
import { Motherboard } from '../motherboard.model';
import { MotherboardService } from '../motherboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit-motherboard',
  templateUrl: './edit-motherboard.component.html',
  styleUrls: ['./edit-motherboard.component.css']
})
export class EditMotherboardComponent {
  
  id : number;
  motherboard: Motherboard = new Motherboard();

  itemForm: FormGroup;


  constructor(private MotherboardService : MotherboardService,
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

    this.MotherboardService.getMotherboardId(this.id).subscribe ({
      next :data => { 
        this.motherboard = data;
        this.itemForm.patchValue({
          name: this.motherboard.name,
          price: this.motherboard.price,
          details: this.motherboard.details,
          imageUrl: this.motherboard.imageUrl
        });
      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.MotherboardService.updateMotherboard(this.id, this.motherboard).subscribe( {
        next : data =>{
        this.goToMotherboard();
      },
      error :error => console.log(error)});
    }

    goToMotherboard(){
      this.router.navigate(['admin/motherboard']);
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
