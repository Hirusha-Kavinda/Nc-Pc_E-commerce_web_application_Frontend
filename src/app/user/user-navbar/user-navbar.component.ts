import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { cartCount } from '../cart.count';


@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {

  constructor( private cartcount : cartCount ,
                private router : Router){
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
if(sessionStorage.getItem('localCart') != null){
  var cartCount = JSON.parse(sessionStorage.getItem('localCart') || '{}');
 this.cartItem = cartCount.length;
} 

}

navigateCart(){
  this.router.navigate(['store/user/cart']);
}

}
