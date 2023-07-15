import { Component } from '@angular/core';
import { Motherboard } from './motherboard.model';
import { MotherboardService } from './motherboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrls: ['./motherboard.component.css']
})
export class MotherboardComponent {

  motherboard : Motherboard[];


  constructor(private MotherboardService : MotherboardService,
    private router: Router){}



  ngOnInit(): void {
    this.getMotherboardList();
  }


  private getMotherboardList(){
    this.MotherboardService.getMotherboardList().subscribe(data =>{
      this.motherboard =data.filter(motherboard => motherboard.categoryID === 200);
    })
  }

  addNewMotherboard(){
    this.router.navigate(['admin/motherboard/new'])
  }

  updateMotherboard(id:number){
  this.router.navigate(['admin/motherboard/update/',id]);
 
}

deleteMotherboard(id : number){
  this.MotherboardService.deleteMotherboard(id).subscribe({
    next : data => { console.log(data); this.getMotherboardList();}
  })
  this.router.navigate(['admin/motherboard'])
}

MotherboardDetails(id : number){
this.router.navigate(['admin/motherboard/details/',id]);

}



// delete alert

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



