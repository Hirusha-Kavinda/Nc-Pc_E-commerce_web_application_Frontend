import { Component } from '@angular/core';
import { Moniter } from './moniter-model';
import { MoniterService } from './moniter-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moniter',
  templateUrl: './moniter.component.html',
  styleUrls: ['./moniter.component.css']
})
export class MoniterComponent {

  moniter : Moniter[];


  constructor(private moniterService : MoniterService,
    private router: Router){}



  ngOnInit(): void {
    this.getMoniterList();
  }


  private getMoniterList(){
    this.moniterService .getMoniterList().subscribe(data =>{
      this.moniter =data.filter(memory => memory.categoryID === 400);
    })
  }

  addNewMoniter(){
    this.router.navigate(['admin/moniter/new'])
  }

  updateMoniter(id:number){
  this.router.navigate(['admin/moniter/update/',id]);
 
}

deleteMoniter(id : number){
  this.moniterService.deleteMoniter(id).subscribe({
    next : data => { console.log(data); this.getMoniterList();}
  })
  this.router.navigate(['admin/moniter'])
}

MoniterDetails(id : number){
this.router.navigate(['admin/moniter/details/',id]);

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

      this.deleteMoniter(id)


    
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
