import { Component } from '@angular/core';
import { Vga } from '../vga-model';
import { ActivatedRoute, Router } from '@angular/router';
import { VgaService } from '../vga-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vga-details',
  templateUrl: './vga-details.component.html',
  styleUrls: ['./vga-details.component.css']
})
export class VgaDetailsComponent {

  id : number
  vga : Vga
  vgas : Vga[]


  constructor(private route: ActivatedRoute , 
    private vgaService : VgaService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.vga = new Vga();
      this.vgaService.getVgaId(this.id).subscribe(data => {
        this.vga = data;
      });
    }

   updateVga(id : number){
    this.router.navigate(['admin/vga/update/',id]);
   }

   deleteVga(id : number){
    this.vgaService.deleteVga(id).subscribe({
      next : data => {console.log(data); this.getVgaList();}
    })
    this.router.navigate(['admin/vga'])
   }

   private getVgaList(){
    this.vgaService.getVgaList().subscribe(data => {
      this.vgas = data;
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
