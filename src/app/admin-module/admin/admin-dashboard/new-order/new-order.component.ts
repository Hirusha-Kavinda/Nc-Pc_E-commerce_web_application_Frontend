import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EmailService } from '../email-service';
import { bill } from '../../admin-bill/admin.bill-model';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit{

  
  items: any[];
  filteredItems: any[];

  bill : bill[];

  constructor(private http: HttpClient , 
             private router: Router  ,
              private emailService : EmailService,
              ){}

  ngOnInit(): void {
    
 
  this.http.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
    this.items = items;
    this.filteredItems = items.filter(item => item.states === 'pending');
   
    this.filteredItems.sort((a, b) => {
      const invoiceNumberA = parseInt(a.id);
      const invoiceNumberB = parseInt(b.id);
      return invoiceNumberB - invoiceNumberA;
    });

    const cardCount = this.filteredItems.length;
    console.log('Number of cards displayed:', cardCount);
  
   

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




billDetails(orderId : String ){
this.router.navigate(['admin/dashboard/NewOrders/bill/',orderId ])
}



confirmedOrder(orderId: string) {
  const endpoint = `http://localhost:8080/api/v1/updateOrderState/${orderId}`;
  const updatedState = 'confirme';

  this.http.put(endpoint, { states: updatedState }).subscribe({
    next :response => {
      console.log('Order confirmed successfully');
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


canclemOrder(orderId: string) {
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



// confirm notification alert

confirmNotify(orderId: string ){
  Swal.fire({
    title : "<h2 style='color:White'>" +'Are you Sure This Confirmation ?'+"<br><br>"+"<h5 style='color:White'>"+'If you accept this then be ready to place the order'+   "</h2>",
    icon : 'info',
    showCancelButton : true,
    confirmButtonText : 'Yes Confirm it',
    confirmButtonColor : '#2cd54c',
    cancelButtonText : 'No keep it',
    cancelButtonColor : '#c61e1e',
    background : '#303A42'
  }).then((result) =>{ 
    if (result.value) {

      this.confirmedOrder(orderId); 
     this.billDetails(orderId); 
     

      const order = this.items.find(item => item.id === orderId);
        if (order && order.products) {
          this.sendConfirmationEmail( order.id , order.name , order.address , order.nic , order.phoneNumber,  order.email, order.products);
        }else {
          console.error('Order or items not found');
          // TODO: Show error message to the user
        }
    
      

    Swal.fire({
      icon : 'success',
      iconColor : '#2cd54c',
      title :"<h2 style='color:White'>" +'Confirmation Success ! ' +"<br><br>"+"<h5 style='color:White'>"+  'Your can print a bill and place the order'+"</h2>",
      background : '#303A42'
    })
  }
  else if (result.dismiss === Swal.DismissReason.cancel){
Swal.fire({
        icon : 'error',
        title: "<h2 style='color:White'>"+'Cancelled'+"<br><br>"+"<h5 style='color:White'>"+ 'Order not confirm yet  '+"</h2>",
        background : '#303A42'
      });
}      
 }) 


}

sendConfirmationEmail(id: string , name : string , address : string , nic: string , phoneNumber: string , email: string, items: any[]) {
  const orderedItems = items.map (item => `product name -${item.name}      Price : ${item.price}       Quantity: ${item.qnt}  `);
  const orderDetails =` Invoice Number :${ id }\n customer name :${ name }\n customer address :${address }\n customer nic :${ nic }\n  phoneNo:${phoneNumber}\n\n\n\n Ordered Items \n${orderedItems.join('\n')}`;
  
  const emailData = {
    to: email,
    subject: 'Order Confirmation',
    message: `Thank you for your order! Your order has been confirmed.\n\n${orderDetails}\n\n  order is deliverd within three days \n make sure you want emergency cancle you order , call within on e day `
  };

  this.emailService.sendEmail(emailData).subscribe({
   next : response => {
      console.log('Email sent successfully' , response);
      // TODO: Show success message to the user
    },
    error :error => {
      console.log('Email sent successfully' );
      /* console.error('Error sending email', error); */
      // TODO: Show error message to the user
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

      this.canclemOrder(orderId);

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
      title :"<h2 style='color:White'>" +' Order is cancle  <i class="fa fa-frown-o" aria-hidden="true"></i>  ! ' +"<br><br>"+"<h5 style='color:White'>"+  'Your can print a bill and place the order'+"</h2>",
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

sendCancleEmail(id: string , name : string , address : string , nic: string , phoneNumber: string , email: string, items: any[]) {
  const orderedItems = items.map (item => `product name -${item.name}      Price : ${item.price}       Quantity: ${item.qnt}  `);
  const orderDetails =` Invoice Number :${ id }\n customer name :${ name }\n customer address :${address }\n customer nic :${ nic }\n  phoneNo:${phoneNumber}\n\n\n\n Ordered Items \n${orderedItems.join('\n')}`;
  
  const emailData = {
    to: email,
    subject: 'Order Cancle',
    message: `you order is cancle !! .\n\n${orderDetails}\n\n  this order cancel . `
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

onbill(){
  this.router.navigate([''])
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











