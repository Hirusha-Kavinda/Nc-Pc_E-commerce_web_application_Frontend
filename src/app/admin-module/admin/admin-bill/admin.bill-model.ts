export class bill{

 id : number;
 name : string;
 address: string;
 nic : string;
 email : string;
 phoneNo : string;
 createdDate  : string;
 createdTime : string; 

 products: Product[]; }

export interface Product {
  
    oid : number;
    id: number;
    qnt : number;
    name : string;
    price: number;
    

  }