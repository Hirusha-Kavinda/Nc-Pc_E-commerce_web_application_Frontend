import { Component } from '@angular/core';
import { Memory } from '../memory-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoryService } from '../memory-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-memory-details',
  templateUrl: './memory-details.component.html',
  styleUrls: ['./memory-details.component.css']
})
export class MemoryDetailsComponent {

  id : number
  memory : Memory
  memorys : Memory[]


  constructor(private route: ActivatedRoute , 
    private memoryService : MemoryService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.memory = new Memory();
      this.memoryService.getMemoryId(this.id).subscribe(data => {
        this.memory = data;
      });
    }

   updateMemory(id : number){
    this.router.navigate(['admin/memory/update/',id]);
   }

   deleteMemory(id : number){
    this.memoryService.deleteMemory(id).subscribe({
      next : data => {console.log(data); this.getMemoryList();}
    })
    this.router.navigate(['admin/memory'])
   }

   private getMemoryList(){
    this.memoryService.getMemoryList().subscribe(data => {
      this.memorys = data;
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
