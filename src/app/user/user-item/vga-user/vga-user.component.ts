import { Component } from '@angular/core';
import { VgaUser } from './vga-user-model';
import { VgaUserService } from './vga-user-service';
import { cartCount } from '../../cart.count';
import  AOS from 'aos';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-vga-user',
  templateUrl: './vga-user.component.html',
  styleUrls: ['./vga-user.component.css']
})
export class VgaUserComponent {
  VgaUser : VgaUser[ ];

  constructor(private VgaUserService : VgaUserService,
              private cartCount : cartCount ,
              private router : Router){}
  
  ngOnInit(): void {
    AOS.init();
    this.getMbTestList();
  }
  
  private getMbTestList(){
    this.VgaUserService.getMbTestList().subscribe(data =>{

      //this.MotherboardUser =data.filter(MotherboardUser => MotherboardUser.categoryID === 200);
      this.VgaUser =data.filter(VgaUser => VgaUser.categoryID === 100);
    })
  }
  
  inc(MbTest){
    //console.log(Testvga.qnt);
    if(MbTest.qnt != 5){
      MbTest.qnt += 1; }
  }
  
  dec(MbTest: any){
    if(MbTest.qnt != 1){
      MbTest.qnt -= 1; }
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


  ItemDetails(id : number){
    this.router.navigate(['store/user/item/details/',id]);
    
    }

}
