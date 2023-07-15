import { Component } from '@angular/core';
import { Vga } from '../vga-model';
import { VgaService } from '../vga-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vga-create',
  templateUrl: './vga-create.component.html',
  styleUrls: ['./vga-create.component.css']
})
export class VgaCreateComponent {

  vga: Vga = new Vga();

  itemForm: FormGroup;


  constructor(private vgaService : VgaService,
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
  
  saveVga(){
   this.vgaService.createNewVga(this.vga).subscribe({ next :
  data => {
    console.log(data);
    this.goToVga();
  },
   error : error => console.log(error)
  });}

goToVga(){
      this.router.navigate(['admin/vga'])}

onSubmit(){
  this.vga.categoryID = 100;
     console.log(this.vga);
     this.saveVga();
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
