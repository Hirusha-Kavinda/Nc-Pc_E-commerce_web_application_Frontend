import { Component } from '@angular/core';
import { Psu } from './psu-model';
import { PsuService } from './psu-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-psu',
  templateUrl: './psu.component.html',
  styleUrls: ['./psu.component.css']
})
export class PsuComponent {


  psu : Psu[];


  constructor(private psuService : PsuService,
    private router: Router){}



  ngOnInit(): void {
    this.getPsuList();
  }


  private getPsuList(){
    this.psuService.getPsuList().subscribe(data =>{
      this.psu =data.filter(psu => psu.categoryID === 800);
    })
  }

  addNewPsu(){
    this.router.navigate(['admin/psu/new'])
  }

  updatePsu(id:number){
  this.router.navigate(['admin/psu/update/',id]);
 
}

deletePsu(id : number){
  this.psuService.deletePsu(id).subscribe({
    next : data => { console.log(data); this.getPsuList();}
  })
  this.router.navigate(['admin/psu'])
}

PsuDetails(id : number){
this.router.navigate(['admin/psu/details/',id]);

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
