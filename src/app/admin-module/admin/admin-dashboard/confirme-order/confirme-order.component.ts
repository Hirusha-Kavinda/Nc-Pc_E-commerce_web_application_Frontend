import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmailService } from '../email-service';

@Component({
  selector: 'app-confirme-order',
  templateUrl: './confirme-order.component.html',
  styleUrls: ['./confirme-order.component.css']
})
export class ConfirmeOrderComponent {

  items: any[];
  filteredItems: any[] =[];
  selectedDate: string; 
  invoiceNumber: string;

  constructor(private http: HttpClient ,
              private router : Router,
              private emailService : EmailService){}

  ngOnInit(): void {
    
 
  this.http.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
    this.items = items;
    this.filteredItems = items.filter(item => item.states === 'confirme'&& (!this.selectedDate || item.createdDate === this.selectedDate));
    
    this.filteredItems.sort((a, b) => {
      const invoiceNumberA = parseInt(a.id);
      const invoiceNumberB = parseInt(b.id);
      return invoiceNumberB - invoiceNumberA;
    });
    
    const cardCount = this.filteredItems.length;
   console.log('Number of cards displayed:', cardCount);

   this.selectedDate = this.getCurrentDate();

   this.applyInvoiceFilter()

  });



}
calculateTotalPriceById(orderId: string): number {
  let totalPrice = 0;
  for (const item of this.items) {
    if (item.id === orderId) {
      for (const product of item.products) {
        totalPrice += product.qnt * product.price;
      }
      break; // Break the loop if the ID is found
    }
  }
  return totalPrice;
}



EmgCancleOrder(orderId: string) {
  const endpoint = `http://localhost:8080/api/v1/updateOrderState/${orderId}`;
  const updatedState = 'cancle';

  this.http.put(endpoint, { states: updatedState }).subscribe({
    next :response => {
      console.log('Order cancle successfully');
      const order = this.items.find(item => item.id === orderId);
      if (order) {
        order.states = updatedState;
      }
    },
    error : error => {
      console.error('Error confirming order', error);
    }
});
}







cancleNotify(orderId: string ){
  Swal.fire({
    title : "<h2 style='color:white'>" +'Are You Sure This Order Is Cancle ?'+"<br><br>"+"<h5 style='color:White'>"+'If you cancle this order it is cancle'+   "</h2>",
    icon : 'warning',
    iconColor : '#c61e1e',
    showCancelButton : true,
    confirmButtonText : 'Yes Cancle it',
    confirmButtonColor : '#c61e1e',
    cancelButtonText : 'No keep it',
    cancelButtonColor : '#34cbcb',
    background : '#303A42'
  }).then((result) =>{ 
    if (result.value) {

      this.EmgCancleOrder(orderId);

      const order = this.items.find(item => item.id === orderId);
      if (order && order.products) {
        this.sendCancleEmail( order.id , order.name , order.address , order.nic , order.phoneNumber,  order.email, order.products);
      }else {
        console.error('Order or items not found');
        // TODO: Show error message to the user
      }

      this.refreshPage();

    Swal.fire({
      icon : 'success',
      iconColor : '#c61e1e',
      title :"<h2 style='color:White'>" +' Order is cancle <i class="fa fa-frown-o" aria-hidden="true"></i> !' +"<br><br>"+"<h5 style='color:White'>"+  'Your can print a bill and place the order'+"</h2>",
      background : '#303A42'
    })
  }
  else if (result.dismiss === Swal.DismissReason.cancel){
Swal.fire({
        icon : 'error',
        iconColor : '#c61e1e',
        title: "<h2 style='color:White'>"+'Cancelled'+"<br><br>"+"<h5 style='color:White'>"+ 'Order not cancle yet  '+"</h2>",
        background : '#303A42'
      });
}      
 }) 


}


applyDateFilter(): void {
  this.filteredItems = this.items.filter(item => item.states === 'confirme' && (!this.selectedDate || item.createdDate.startsWith(this.selectedDate)));
}




applyInvoiceFilter() {
 
  if (this.invoiceNumber) {
    this.filteredItems = this.items.filter(item =>
      item.states === 'confirme' && item.id.toString().includes(this.invoiceNumber)
    );
  } else {
    this.filteredItems = this.items.filter(item => item.states === 'confirme');
  } 
}




getCurrentDate(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding leading zero if needed
  const day = ("0" + currentDate.getDate()).slice(-2); // Adding leading zero if needed
  return `${year}-${month}-${day}`;
}


sendCancleEmail(id: string , name : string , address : string , nic: string , phoneNumber: string , email: string, items: any[]) {
  const orderedItems = items.map (item => `product name -${item.name}      Price : ${item.price}       Quantity: ${item.qnt}  `);
  const orderDetails =` Invoice Number :${ id }\n customer name :${ name }\n customer address :${address }\n customer nic :${ nic }\n  phoneNo:${phoneNumber}\n\n\n\n Ordered Items \n${orderedItems.join('\n')}`;
  
  const emailData = {
    to: email,
    subject: 'Emergency Cancle',
    message: `you order is cancle after confirm !! .\n\n${orderDetails}\n\n  this order cancel . `
  };

  this.emailService.sendEmail(emailData).subscribe(
    response => {
      console.log('Email sent successfully');
      // TODO: Show success message to the user
    },
    error => {
      console.log('Email sent successfully' );
      /* console.error('Error sending email', error); */
      // TODO: Show error message to the user
    }
  );
}













refreshPage(): void {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  const currentUrl = this.router.url + '?';
  this.router.navigateByUrl(currentUrl).then(() => {
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  });
}



}
