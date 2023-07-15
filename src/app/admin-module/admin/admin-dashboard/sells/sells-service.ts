import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { sells } from "./sells-model";


@Injectable({
    providedIn : 'root'
})

export class sellsService {

    private baseURL = "http://localhost:8080/api/v1/findSellsOrder";


    constructor(private httpClient: HttpClient){}



    getSells(): Observable<sells[]>{
        return this.httpClient.get<sells[]>(`${this.baseURL}`);
        
    }

   



}