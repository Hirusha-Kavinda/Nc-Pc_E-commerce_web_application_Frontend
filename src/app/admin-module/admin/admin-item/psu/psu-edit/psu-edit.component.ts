import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Psu } from '../psu-model';
import { PsuService } from '../psu-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-psu-edit',
  templateUrl: './psu-edit.component.html',
  styleUrls: ['./psu-edit.component.css']
})
export class PsuEditComponent {


  id : number;
  psu: Psu = new Psu();
  itemForm: FormGroup;

  constructor(private psuService : PsuService,
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

    this.psuService.getPsuId(this.id).subscribe ({
      next :data => { 
        this.psu = data;
      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.psuService.updatePsu(this.id, this.psu).subscribe( {
        next : data =>{
        this.goToPsu();
      },
      error :error => console.log(error)});
    }

    goToPsu(){
      this.router.navigate(['admin/psu']);
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
