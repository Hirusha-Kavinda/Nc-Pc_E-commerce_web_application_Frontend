import { Injectable } from "@angular/core";
/* import { Subject } from "rxjs"; */
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Psu } from "./psu-model";


@Injectable({
    providedIn : 'root'
})

export class PsuService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getPsuList(): Observable<Psu[]>{
        return this.httpClient.get<Psu[]>(`${this.baseURL}`);
        
    }

    createNewPsu(psu : Psu):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, psu);
    }

    getPsuId(id: number):Observable<Psu>{
        return this.httpClient.get<Psu>(`${this.baseURL}/${id}`);
    }

    updatePsu(id: number, psu : Psu): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, psu);
    }

    deletePsu(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

/* 
   cartSubject = new Subject<any>(); */



}