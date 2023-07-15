import { HttpClient } from '@angular/common/http';
import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { bill } from './admin.bill-model';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from './admin-bill-service';
import { interval } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-bill',
  templateUrl: './admin-bill.component.html',
  styleUrls: ['./admin-bill.component.css']
})
export class AdminBillComponent {
@ViewChild('popupContent', { static: true }) popupContent!: ElementRef;
  

  constructor( private http : HttpClient ,
               private route: ActivatedRoute,
               private billService : BillService,
               private router : Router ){}

  id : number;
  bill : bill;
  bills : bill[]


  


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.bill = new bill();
      this.billService.getBillById(this.id).subscribe(data => {
        this.bill = data;
        
         this.DownloadNotify() 
      });


      
  

}


downloadAsPDF(): void {
  const doc = new jsPDF();

  const content = this.popupContent.nativeElement;

  html2canvas(content, {
    scrollY: -window.scrollY,
    windowHeight: content.scrollHeight
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png' , 1.0);
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.setFillColor(255, 255, 255); // Set background color for the PDF
    doc.rect(0, 0, pdfWidth, pdfHeight, 'F'); // Draw a filled rectangle with the background color
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    doc.save('NCPC_Bill.pdf');
  });
}


onCancle(){
  this.router.navigate(['admin/dashboard/NewOrders'])
}


DownloadNotify( ){
  Swal.fire({
    title : "<h2 style='color:White'>" +'Are you Sure download this bill ?'+"<br><br>"+"<h5 style='color:White'>"+'If you get bill this process is fully complete'+   "</h2>",
    icon : 'info',
   
    confirmButtonText : 'Yes download it',
    confirmButtonColor : '#2cd54c',
   /*  cancelButtonText : 'No keep it',
    cancelButtonColor : '#c61e1e', */
    background : '#303A42'
  }).then((result) =>{ 
    if (result.value) {


      this.downloadAsPDF()
      this.onCancle()

    Swal.fire({
      icon : 'success',
      iconColor : '#2cd54c',
      title :"<h2 style='color:White'>" +'Bill is downloaded ! ' +"<br><br>"+"<h5 style='color:White'>"+  'Your can print a bill and place the order'+"</h2>",
      background : '#303A42'
    })
  }
    
 }) 


}

calculateTotalSubtotal(): number {
  let totalSubtotal = 0;

  for (let product of this.bill.products) {
    totalSubtotal += product.price * product.qnt;
  }

  return totalSubtotal;
}


}