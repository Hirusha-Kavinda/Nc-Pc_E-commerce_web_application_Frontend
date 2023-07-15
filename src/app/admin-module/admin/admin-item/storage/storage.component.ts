import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from './storage-service';
import { Storage } from './storage-model';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {


  str : Storage[];


  constructor(private StrService : StorageService,
    private router: Router){}



  ngOnInit(): void {
    this.getStroageList();
  }


  private getStroageList(){
    this.StrService.getStorageList().subscribe(data =>{
      this.str =data.filter( str => str.categoryID === 600);
    })
  }

  addNewStroage(){
    this.router.navigate(['admin/storage/new'])
  }

  updateStroage(id:number){
  this.router.navigate(['admin/storage/update/',id]);
 
}

deleteStroage(id : number){
  this.StrService.deleteStorage(id).subscribe({
    next : data => { console.log(data); this.getStroageList();}
  })
  this.router.navigate(['admin/storage'])
}

StorageDetails(id : number){
this.router.navigate(['admin/storage/details/',id]);

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

      this.deleteStroage(id)


    
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
