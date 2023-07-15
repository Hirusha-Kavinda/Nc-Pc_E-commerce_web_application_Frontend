import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Moniter } from '../moniter-model';
import { MoniterService } from '../moniter-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-moniter-edit',
  templateUrl: './moniter-edit.component.html',
  styleUrls: ['./moniter-edit.component.css']
})
export class MoniterEditComponent {

  id : number;
  moniter: Moniter= new Moniter();
  itemForm: FormGroup;

  constructor(private moniterService : MoniterService,
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

    this.moniterService.getMoniterId(this.id).subscribe ({
      next :data => { 
        this.moniter = data;
        this.itemForm.patchValue({
          name: this.moniter.name,
          price: this.moniter.price,
          details: this.moniter.details,
          imageUrl: this.moniter.imageUrl
        });
      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.moniterService.updateMoniter(this.id, this.moniter).subscribe( {
        next : data =>{
        this.goToMotherboard();
      },
      error :error => console.log(error)});
    }

    goToMotherboard(){
      this.router.navigate(['admin/moniter']);
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
