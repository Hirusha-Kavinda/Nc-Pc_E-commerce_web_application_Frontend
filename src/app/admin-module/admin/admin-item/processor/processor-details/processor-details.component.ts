import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Processor } from '../processor-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessorService } from '../processor-service';

@Component({
  selector: 'app-processor-details',
  templateUrl: './processor-details.component.html',
  styleUrls: ['./processor-details.component.css']
})
export class ProcessorDetailsComponent {

  id : number
  processor : Processor
  processors : Processor[]


  constructor(private route: ActivatedRoute , 
    private processorService : ProcessorService,
    private router : Router){}


    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.processor = new Processor();
      this.processorService.getProcessorId(this.id).subscribe(data => {
        this.processor = data;
      });
    }

   updateProcessor(id : number){
    this.router.navigate(['admin/processor/update/',id]);
   }

   deleteProcessor(id : number){
    this.processorService.deleteProcessor(id).subscribe({
      next : data => {console.log(data); this.getProcessorList();}
    })
    this.router.navigate(['admin/processor'])
   }

   private getProcessorList(){
    this.processorService.getProcessorList().subscribe(data => {
      this.processors = data;
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
  
        this.deleteProcessor(id)
  
  
      
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
