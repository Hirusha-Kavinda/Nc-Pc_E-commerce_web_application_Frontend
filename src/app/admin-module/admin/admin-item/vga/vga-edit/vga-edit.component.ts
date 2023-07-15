import { Component } from '@angular/core';
import { Vga } from '../vga-model';
import { VgaService } from '../vga-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vga-edit',
  templateUrl: './vga-edit.component.html',
  styleUrls: ['./vga-edit.component.css']
})
export class VgaEditComponent {

  id : number;
  vga : Vga = new Vga();

  itemForm: FormGroup;


  constructor(private vgaService : VgaService,
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

    this.vgaService.getVgaId(this.id).subscribe ({
      next :data => { 
        this.vga = data;
        this.itemForm.patchValue({
          name: this.vga.name,
          price: this.vga.price,
          details: this.vga.details,
          imageUrl: this.vga.imageUrl
        });
      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.vgaService.updateVga(this.id, this.vga).subscribe( {
        next : data =>{
        this.goToMotherboard();
      },
      error :error => console.log(error)});
    }

    goToMotherboard(){
      this.router.navigate(['admin/vga']);
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
