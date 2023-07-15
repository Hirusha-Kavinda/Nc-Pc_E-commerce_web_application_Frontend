import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Speacker } from '../speacker-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeackerService } from '../speacker-service';

@Component({
  selector: 'app-speacker-details',
  templateUrl: './speacker-details.component.html',
  styleUrls: ['./speacker-details.component.css']
})
export class SpeackerDetailsComponent {

  id : number
  spec : Speacker
  specs : Speacker[]


  constructor(private route: ActivatedRoute , 
    private specService : SpeackerService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.spec = new Speacker();
      this.specService.getSpeackerId(this.id).subscribe(data => {
        this.spec  = data;
      });
    }

   updateSpeacker(id : number){
    this.router.navigate(['admin/speacker/update/',id]);
   }

   deleteSpeacker(id : number){
    this.specService.deleteSpeacker(id).subscribe({
      next : data => {console.log(data); this.getSpeackerList();}
    })
    this.router.navigate(['admin/speacker'])
   }

    private getSpeackerList(){
    this.specService.getSpeackerList().subscribe(data => {
      this.specs = data;
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
  
        this.deleteSpeacker(id)
  
  
      
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
