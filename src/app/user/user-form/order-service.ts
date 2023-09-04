import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "./order-model";


@Injectable({
    providedIn : 'root'
})

export class orderService {

    

    private baseURL = "http://localhost:8080/api/v1/placeOrder";


    constructor(private httpClient: HttpClient){}   
/* 
    createNewOrder(customer : Customer):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, customer);
    } */

    placeOrder(customer: Customer): Observable<any> {
        const orderRequest = {
          customer: customer,
          products: customer.products
        };
        return this.httpClient.post(`${this.baseURL} `, orderRequest);
      }

      consoleData: string[] = [];

      addConsoleData(data: string) {
        this.consoleData.push(data);
      }


     

}