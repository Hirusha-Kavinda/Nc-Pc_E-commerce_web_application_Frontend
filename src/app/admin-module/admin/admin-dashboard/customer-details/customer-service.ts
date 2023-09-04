import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { customerd } from "./customer-model";


@Injectable({
    providedIn : 'root'
})

export class customerService {

    

    private baseURL = "http://localhost:8080/api/v1/findAllOrder";


    constructor(private httpClient: HttpClient){}   


    getCustomer(): Observable<customerd[]> {
        return this.httpClient.get<customerd[]>(this.baseURL);
      }
     

}