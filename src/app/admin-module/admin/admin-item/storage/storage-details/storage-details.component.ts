import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from '../storage-service';
import { Storage } from '../storage-model';

@Component({
  selector: 'app-storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.css']
})
export class StorageDetailsComponent {


  
  id : number
  str : Storage
  strs : Storage[]


  constructor(private route: ActivatedRoute , 
    private StrService : StorageService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.str = new Storage();
      this.StrService.getStorageId(this.id).subscribe(data => {
        this.str = data;
      });
    }

   updateStorage(id : number){
    this.router.navigate(['admin/storage/update/',id]);
   }

   deleteStorage(id : number){
    this.StrService.deleteStorage(id).subscribe({
      next : data => {console.log(data); this.getStorageList();}
    })
    this.router.navigate(['admin/storage'])
   }

    private getStorageList(){
    this.StrService.getStorageList().subscribe(data => {
      this.strs = data;
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
  
        this.deleteStorage(id)
  
  
      
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
