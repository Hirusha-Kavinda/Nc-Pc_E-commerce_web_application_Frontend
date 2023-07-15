import { Component } from '@angular/core';
import { KeyboardM } from '../keyboard-m-model';
import { KeyboardMService } from '../keyboard-m-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-edit-keyboardm',
  templateUrl: './edit-keyboardm.component.html',
  styleUrls: ['./edit-keyboardm.component.css']
})
export class EditKeyboardmComponent {

  id : number;
  keym: KeyboardM = new KeyboardM();

  itemForm: FormGroup;



  constructor(private keymService : KeyboardMService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ){ 
 
      this.itemForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        details: ['', Validators.required],
        imageUrl: ['', Validators.required]
      });
    
  
    }
 

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.keymService.getKeyboardMId(this.id).subscribe({
      next: (data) => {
        this.keym = data;
        this.itemForm.patchValue({
          name: this.keym.name,
          price: this.keym.price,
          details: this.keym.details,
          imageUrl: this.keym.imageUrl
        });
      },
      error: (error) => console.log(error)
    });
  }


   





    onSubmit(){
      if (this.itemForm.invalid) {
        
        // Show error message or handle invalid form submission
        return;
      }
  

  
      this.keymService.updateKeyboardM(this.id, this.keym).subscribe( {
        next : data =>{
        this.goToKeyboardM();
      },
      error :error => console.log(error)});
    }

    goToKeyboardM(){
      this.router.navigate(['admin/keyboardmouse']);
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
