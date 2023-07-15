import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CardCountService } from '../cartCounterService';

@Component({
  selector: 'app-cancle-order',
  templateUrl: './cancle-order.component.html',
  styleUrls: ['./cancle-order.component.css']
})
export class CancleOrderComponent {

  items: any[];
  filteredItems: any[];
  selectedDate: string; 
  invoiceNumber: string;

  constructor(private http: HttpClient ,
               private cardCountService: CardCountService){}

  ngOnInit(): void {
    
 
   this.http.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
    this.items = items;
    this.filteredItems = items.filter(item => item.states === 'cancle');
    const cardCount = this.filteredItems.length;
    console.log('Number of cards displayed:', cardCount);
    this.cardCountService.setCount(cardCount);

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


applyDateFilter(): void {
  this.filteredItems = this.items.filter(item => item.states === 'cancle' && (!this.selectedDate || item.createdDate.startsWith(this.selectedDate)));
}




applyInvoiceFilter() {
 
  if (this.invoiceNumber) {
    this.filteredItems = this.items.filter(item =>
      item.states === 'cancle' && item.id.toString().includes(this.invoiceNumber)
    );
  } else {
    this.filteredItems = this.items.filter(item => item.states === 'cancle');
  } 
}


}
