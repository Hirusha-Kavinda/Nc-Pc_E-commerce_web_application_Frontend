import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Memory } from './memory-model';
import { MemoryService } from './memory-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent {

  memory : Memory[];


  constructor(private memoryService : MemoryService,
    private router: Router){}



  ngOnInit(): void {
    this.getMemoryList();
  }


  private getMemoryList(){
    this.memoryService.getMemoryList().subscribe(data =>{
      this.memory =data.filter(memory => memory.categoryID === 500);
    })
  }

  addNewMemory(){
    this.router.navigate(['admin/memory/new'])
  }

  updateMemory(id:number){
  this.router.navigate(['admin/memory/update/',id]);
 
}

deleteMemory(id : number){
  this.memoryService.deleteMemory(id).subscribe({
    next : data => { console.log(data); this.getMemoryList();}
  })
  this.router.navigate(['admin/memory'])
}

MemoryDetails(id : number){
this.router.navigate(['admin/memory/details/',id]);

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

      this.deleteMemory(id)


    
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
