import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Vga } from './vga-model';
import { VgaService } from './vga-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vga',
  templateUrl: './vga.component.html',
  styleUrls: ['./vga.component.css']
})
export class VgaComponent {

  vga : Vga[];


  constructor(private vgaService : VgaService,
    private router: Router){}



  ngOnInit(): void {
    this.getVgaList();
  }


  private getVgaList(){
    this.vgaService.getVgaList().subscribe(data =>{
      this.vga =data.filter(vga => vga.categoryID === 100);
    })
  }

  addNewVga(){
    this.router.navigate(['admin/vga/new'])
  }

  updateVga(id:number){
  this.router.navigate(['admin/vga/update/',id]);
 
}

deleteVga(id : number){
  this.vgaService.deleteVga(id).subscribe({
    next : data => { console.log(data); this.getVgaList();}
  })
  this.router.navigate(['admin/vga'])
}

VgaDetails(id : number){
this.router.navigate(['admin/vga/details/',id]);

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

      this.deleteVga(id)


    
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
