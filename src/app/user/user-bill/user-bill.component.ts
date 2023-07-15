import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { orderService } from '../user-form/order-service';

@Component({
  selector: 'app-user-bill',
  templateUrl: './user-bill.component.html',
  styleUrls: ['./user-bill.component.css']
})
export class UserBillComponent implements OnInit{
  orderResponse: any;
  
    constructor(public orderService : orderService){}
  
  ngOnInit(): void {
   
  }
   
  
  
  }


  


