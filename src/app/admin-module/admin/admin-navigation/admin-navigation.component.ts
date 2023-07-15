import { Component } from '@angular/core';
import { cartCount } from '../../../user/cart.count';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent {
  constructor( private cartcount : cartCount){
    this.cartcount.cartSubject.subscribe((data) => {
      this.cartItem = data;
    });
  }

  phoneNo = '0778440286';
  showNumber = false;

  ngOnInit(): void {
    this.cartItemFunc(); 
   
 }

 cartItem:number = 0;
  cartItemFunc(){
if(localStorage.getItem('localCart') != null){
  var cartCount = JSON.parse(localStorage.getItem('localCart') || '{}');
 this.cartItem = cartCount.length;
} 

}

}
