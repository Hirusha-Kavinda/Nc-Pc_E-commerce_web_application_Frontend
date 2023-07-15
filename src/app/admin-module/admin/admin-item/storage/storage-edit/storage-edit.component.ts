import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from '../storage-service';
import { Storage } from '../storage-model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-storage-edit',
  templateUrl: './storage-edit.component.html',
  styleUrls: ['./storage-edit.component.css']
})
export class StorageEditComponent {


  id : number;
  str: Storage = new Storage();
  itemForm: FormGroup;


  constructor(private StrService : StorageService,
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

    this.StrService.getStorageId(this.id).subscribe ({
      next :data => { 
        this.str = data;

        this.itemForm.patchValue({
          name: this.str.name,
          price: this.str.price,
          details: this.str.details,
          imageUrl: this.str.imageUrl
        });
      },
      error : error => console.log(error)});
      
    }



    onSubmit(){
      this.StrService.updateStorage(this.id, this.str).subscribe( {
        next : data =>{
        this.goToStorage();
      },
      error :error => console.log(error)});
    }

    goToStorage(){
      this.router.navigate(['admin/storage']);
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
