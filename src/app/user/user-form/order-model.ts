export interface Customer {
    name: string;
    email: string;
    nic : String;
    address: string;
    phoneNumber: string;
    products: Product[];
  }
  
  export interface Product {
  
    oid : number;
    id: number;
    qnt : number;
    name : string;
    price: string;
    

  }