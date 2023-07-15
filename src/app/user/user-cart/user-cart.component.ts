import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cartCount } from '../cart.count';


@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {

  constructor(
    private cartcount : cartCount ,
    private router: Router ,
    private route : ActivatedRoute ){}


ngOnInit(): void {
this.CartDetails();
this.loadCart();


}

getCartDetails : any=[];
CartDetails(){
if(sessionStorage.getItem('localCart')){
this.getCartDetails = JSON.parse(sessionStorage.getItem('localCart') || '{}')
console.log(this.getCartDetails);
}

}



incQnt(id , qnt){
for(let i=0; i<this.getCartDetails.length; i++){
if(this.getCartDetails[i].id === id){
if(qnt != 5)
this.getCartDetails[i].qnt = parseInt (qnt) + 1;
}
}
sessionStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
this.loadCart();


}


decQnt(id , qnt){
for(let i=0; i<this.getCartDetails.length; i++){
if(this.getCartDetails[i].id === id){
if(qnt != 1)
this.getCartDetails[i].qnt = parseInt (qnt) - 1;
}
}
sessionStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
this.loadCart();


}



ItemTotal : number = 0;
loadCart(){
if(sessionStorage.getItem('localCart')){
this.getCartDetails = JSON.parse(sessionStorage.getItem('localCart') || '{}'); 
this. ItemTotal = this.getCartDetails.reduce(function(acc , val){
return acc + (val.price * val.qnt)
},0)
}
}













RemoveAll(){
sessionStorage.removeItem('localCart');
this.getCartDetails = [];
this. ItemTotal = 0;
this.cartNumber = 0;
this.cartcount.cartSubject.next(this.cartNumber);

}



singleDelete(getCartDetail){
console.log(getCartDetail);
if(sessionStorage.getItem('localCart')){
this.getCartDetails = JSON.parse(sessionStorage.getItem('localCart') || '{}');
for(let i=0; i<this.getCartDetails.length; i++){
if(this.getCartDetails[i].id === getCartDetail){
this.getCartDetails.splice(i, 1);
sessionStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
this.loadCart();
this.CartNumberFunc()


}
}

}
}


cartNumber : number = 0;
CartNumberFunc(){
var cartValue = JSON.parse(sessionStorage.getItem('localCart') || '{}');
this.cartNumber = cartValue.length;
this.cartcount.cartSubject.next(this.cartNumber);


}





  userForm(){
    this.router.navigate(['store/user/cart/form'])
  }




BacktoStore(){
  this.router.navigate(['store/user/motherboard'])
}

}
