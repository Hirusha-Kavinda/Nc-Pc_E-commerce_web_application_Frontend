import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Speacker } from './speacker-model';
import { SpeackerService } from './speacker-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speacker',
  templateUrl: './speacker.component.html',
  styleUrls: ['./speacker.component.css']
})
export class SpeackerComponent {



  spec : Speacker[];


  constructor(private specService : SpeackerService,
    private router: Router){}



  ngOnInit(): void {
    this.getSpeackerList();
  }


  private getSpeackerList(){
    this.specService .getSpeackerList().subscribe(data =>{
      this.spec =data.filter(spec =>spec.categoryID === 700);
    })
  }

  addNewSpeacker(){
    this.router.navigate(['admin/speacker/new'])
  }

  updateSpeacker(id:number){
  this.router.navigate(['admin/speacker/update/',id]);
 
}

deleteSpeacker(id : number){
  this.specService .deleteSpeacker(id).subscribe({
    next : data => { console.log(data); this.getSpeackerList();}
  })
  this.router.navigate(['admin/speacker'])
}

SpeackerDetails(id : number){
this.router.navigate(['admin/speacker/details/',id]);

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
