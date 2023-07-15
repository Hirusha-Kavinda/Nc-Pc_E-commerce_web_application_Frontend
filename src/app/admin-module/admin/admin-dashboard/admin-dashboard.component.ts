import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { CardCountService } from './cartCounterService';
import { HttpClient } from '@angular/common/http';
import  AOS from 'aos';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  items: any[];
  filteredItems: any[];
  
 PendingCount : number;
 ConfirmeCount: number;
 cancleCount : number;

 totalQuantity: number;
 totalSubtotal: number;
 

  constructor( private router : Router ,
               private cardCountService: CardCountService ,
               private http : HttpClient){}

  
 ngOnInit(): void {

  AOS.init();

  this.http.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
  this.items = items;
  this.filteredItems = items.filter(item => item.states === 'pending');
  const cardCount = this.filteredItems.length;
  this.cardCountService.setCount(cardCount);
  this.PendingCount = cardCount;  });


  this.http.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
  this.items = items;
  this.filteredItems = items.filter(item => item.states === 'confirme');
  const cardCount = this.filteredItems.length;
  this.cardCountService.setCount(cardCount);
  this.ConfirmeCount = cardCount;  });


  this.http.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
  this.items = items;
  this.filteredItems = items.filter(item => item.states === 'cancle');
  const cardCount = this.filteredItems.length;
  this.cardCountService.setCount(cardCount);
  this.cancleCount  = cardCount;  });


  this.http.get<any[]>('http://localhost:8080/api/v1/findSellsOrder').subscribe(items => {
    this.totalQuantity = items.reduce((total, item) => total + item.qnt, 0);


    this.http.get<any[]>('http://localhost:8080/api/v1/findSellsOrder').subscribe(items => {
      this.totalSubtotal = items.reduce((total, item) => total + (item.price * item.qnt), 0);
    });

 });


}


  neworder(){
    this.router.navigate(['admin/dashboard/NewOrders'])
  }
  confirmeOrder(){
    this.router.navigate(['admin/dashboard/ConfirmeOrders'])
  }

  cancleOrder(){
    this.router.navigate(['admin/dashboard/CancleOrders'])
  }

  deviceCheck(){
    this.router.navigate(['admin/dashboard/ItemSells'])
  }
 totalSells(){
  this.router.navigate(['admin/dashboard/TotalSells'])
 }

 customer(){
  this.router.navigate(['admin/dashboard/Customers'])
 }

}




