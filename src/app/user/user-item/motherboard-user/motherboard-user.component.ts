import { Component } from '@angular/core';
import { MotherboardUser } from './motherboard-user-model';
import { MotherboardUserService } from './motherboard-user-service';
import { cartCount } from '../../cart.count';
import  AOS from 'aos';
import { Router } from '@angular/router';
AOS.init();

@Component({
  selector: 'app-motherboard-user',
  templateUrl: './motherboard-user.component.html',
  styleUrls: ['./motherboard-user.component.css']
})
export class MotherboardUserComponent {
  MotherboardUser : MotherboardUser[ ];

  constructor(private MotherboardUserService : MotherboardUserService,
              private cartCount : cartCount ,
              private router : Router){}
  
  ngOnInit(): void {
    AOS.init();
    this.getMotherboardList();
  }
  
  private getMotherboardList(){
    this.MotherboardUserService.getMotherboardList().subscribe(data =>{
      this.MotherboardUser =data.filter(MotherboardUser => MotherboardUser.categoryID === 200);
    })
  }


  MotherboardDetails(id : number){
    this.router.navigate(['store/user/item/details/',id]);
    
    }


  
  inc(MotherboardUser){
    //console.log(Testvga.qnt);
    if(MotherboardUser.qnt != 5){
      MotherboardUser.qnt += 1; }
  }
  
  dec(MotherboardUser: any){
    if(MotherboardUser.qnt != 1){
      MotherboardUser.qnt -= 1; }
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
