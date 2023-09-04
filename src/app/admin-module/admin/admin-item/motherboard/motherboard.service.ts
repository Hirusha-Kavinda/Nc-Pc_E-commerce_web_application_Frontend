import { Injectable } from "@angular/core";
/* import { Subject } from "rxjs"; */
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Motherboard } from "./motherboard.model";


@Injectable({
    providedIn : 'root'
})

export class MotherboardService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getMotherboardList(): Observable<Motherboard[]>{
        return this.httpClient.get<Motherboard[]>(`${this.baseURL}`);
        
    }

    createNewMotherboard(motherboard : Motherboard):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, motherboard);
    }

    getMotherboardId(id: number):Observable<Motherboard>{
        return this.httpClient.get<Motherboard>(`${this.baseURL}/${id}`);
    }

    updateMotherboard(id: number, motherboard : Motherboard): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, motherboard);
    }

    deleteMotherboard(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

/* 
   cartSubject = new Subject<any>(); */



}