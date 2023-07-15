import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Psu } from '../psu-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PsuService } from '../psu-service';

@Component({
  selector: 'app-psu-details',
  templateUrl: './psu-details.component.html',
  styleUrls: ['./psu-details.component.css']
})
export class PsuDetailsComponent {



  id : number
  psu : Psu
  psus : Psu[]


  constructor(private route: ActivatedRoute , 
    private psuService : PsuService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.psu = new Psu();
      this.psuService.getPsuId(this.id).subscribe(data => {
        this.psu = data;
      });
    }

   updatePsu(id : number){
    this.router.navigate(['admin/psu/update/',id]);
   }

   deletePsu(id : number){
    this.psuService.deletePsu(id).subscribe({
      next : data => {console.log(data); this.getPsuList();}
    })
    this.router.navigate(['admin/psu'])
   }

    private getPsuList(){
    this.psuService.getPsuList().subscribe(data => {
      this.psus = data;
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
  
        this.deletePsu(id)
  
  
      
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
