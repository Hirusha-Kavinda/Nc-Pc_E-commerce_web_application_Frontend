import { Component } from '@angular/core';
import { Motherboard } from '../motherboard.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MotherboardService } from '../motherboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motherboard-details',
  templateUrl: './motherboard-details.component.html',
  styleUrls: ['./motherboard-details.component.css']
})
export class MotherboardDetailsComponent {

  id : number
  motherboard : Motherboard
  motherboards : Motherboard[]


  constructor(private route: ActivatedRoute , 
    private motherboardService : MotherboardService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.motherboard = new Motherboard();
      this.motherboardService.getMotherboardId(this.id).subscribe(data => {
        this.motherboard = data;
      });
    }

   updateMotherboard(id : number){
    this.router.navigate(['admin/motherboard/update/',id]);
   }

   deleteMotherboard(id : number){
    this.motherboardService.deleteMotherboard(id).subscribe({
      next : data => {console.log(data); this.getMotherboardList();}
    })
    this.router.navigate(['admin/motherboard'])
   }

    private getMotherboardList(){
    this.motherboardService.getMotherboardList().subscribe(data => {
      this.motherboards = data;
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
  
        this.deleteMotherboard(id)
  
  
      
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
