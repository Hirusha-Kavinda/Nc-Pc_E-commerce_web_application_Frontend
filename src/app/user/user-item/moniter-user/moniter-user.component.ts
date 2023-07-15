import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from './user-moniter-service';
import { Item } from './usermoniter-model';
import { cartCount } from '../../cart.count';
import  AOS from 'aos';

@Component({
  selector: 'app-moniter-user',
  templateUrl: './moniter-user.component.html',
  styleUrls: ['./moniter-user.component.css']
})
export class MoniterUserComponent {
  item : Item[];

  constructor(private itemService : ItemService,
              private cartCount : cartCount ,
              private router : Router){}
  
  ngOnInit(): void {
    AOS.init();
    this.getItemList();
  }
  
  private getItemList(){
    this.itemService .getItemList().subscribe(data =>{
      this.item =data.filter(item => item.categoryID === 400);
    })
  }


  ItemDetails(id : number){
    this.router.navigate(['store/user/item/details/',id]);
    
    }


  
  inc(item){
    //console.log(Testvga.qnt);
    if(item.qnt != 5){
      item.qnt += 1; }
  }
  
  dec(item: any){
    if(item.qnt != 1){
      item.qnt -= 1; }
  }
  
  
  
  itemCart:any = [];
  addCart(category){
    let cartDataNull = 
    sessionStorage.getItem('localCart');
  
    if(cartDataNull == null){
      let storeDataGet:any = [];
      storeDataGet.push(category);
      sessionStorage.setItem
      ('localCart',
      JSON.stringify(storeDataGet));
    }
   else {
  
    var id = category.id;
    let index:number = -1;
    this.itemCart = JSON.parse(sessionStorage.getItem ('localCart') || '{}');
    
    
    for(let i= 0 ; i<this.itemCart.length; i++){
      if(parseInt(id) === parseInt(this.itemCart[i].id)){
        this.itemCart[i].qnt = category.qnt;
        index = i;
        break;
    }
  }
  
  
    if(index == -1){
      this.itemCart.push(category);
      sessionStorage.setItem('localCart' , JSON.stringify(this.itemCart));
    }
    else{
      sessionStorage.setItem('localCart' , JSON.stringify(this.itemCart));
    }
   }
   this.CartNumberFunc()
  }
  
  
  cartNumber : number = 0;
  CartNumberFunc(){
    var cartValue = JSON.parse(sessionStorage.getItem('localCart') || '{}');
    this.cartNumber = cartValue.length;
    this.cartCount.cartSubject.next(this.cartNumber);
  
  }

}
