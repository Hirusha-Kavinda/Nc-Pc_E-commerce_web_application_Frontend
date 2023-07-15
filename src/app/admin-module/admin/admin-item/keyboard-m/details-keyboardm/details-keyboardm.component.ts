import { Component } from '@angular/core';
import { KeyboardM } from '../keyboard-m-model';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboardMService } from '../keyboard-m-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-keyboardm',
  templateUrl: './details-keyboardm.component.html',
  styleUrls: ['./details-keyboardm.component.css']
})
export class DetailsKeyboardmComponent {

  id : number
  keym : KeyboardM
  keyms :  KeyboardM[]


  constructor(private route: ActivatedRoute , 
    private keymService :  KeyboardMService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this. keym = new KeyboardM();
      this.keymService.getKeyboardMId(this.id).subscribe(data => {
        this. keym = data;
      });
    }

   updateKeyboardM(id : number){
    this.router.navigate(['admin/keyboardmouse/update/',id]);
   }

   deleteKeyboardM(id : number){
    this.keymService.deleteKeyboardM(id).subscribe({
      next : data => {console.log(data); this.getKeyboardMList();}
    })
    this.router.navigate(['admin/keyboardmouse'])
   }

   private getKeyboardMList(){
    this.keymService.getKeyboardMList().subscribe(data => {
      this.keyms = data;
    })
   }


   DeleteBox(id : number){
    Swal.fire({
      title : "<h2 style='color:White'>" +'Are you Want to Remove this ?'+"<br><br>"+"<h5 style='color:White'>"+'You will not be able to recover this details !'+   "</h2>",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : 'Yes Delete it',
      cancelButtonText : 'No keep it',
      background : '#303A42'
    }).then((result) =>{ 
      if (result.value) {
  
        this.deleteKeyboardM(id)
  
  
      
      Swal.fire({
        icon : 'success',
        iconColor : '#fd0808',
        title :"<h2 style='color:White'>" +'Deleted' +"<br><br>"+"<h5 style='color:White'>"+  'Your file has been deleted success'+"</h2>",
        background : '#303A42'
      })
    }
    else if (result.dismiss === Swal.DismissReason.cancel){
  Swal.fire({
          icon : 'error',
          title: "<h2 style='color:White'>"+'Cancelled'+"<br><br>"+"<h5 style='color:White'>"+ 'Your imaginary file is safe '+"</h2>",
          background : '#303A42'
        });
  }      
   }) 
  
  
  }
}
