import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Item } from "./usermoniter-model";


@Injectable({
    providedIn : 'root'
})

export class ItemService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getItemList(): Observable<Item[]>{
        return this.httpClient.get<Item[]>(`${this.baseURL}`);
        
    }

    getItemId(id: number):Observable<Item>{
        return this.httpClient.get<Item>(`${this.baseURL}/${id}`);
    }


   cartSubject = new Subject<any>();



}