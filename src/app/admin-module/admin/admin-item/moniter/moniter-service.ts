import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Moniter } from "./moniter-model";




@Injectable({
    providedIn : 'root'
})

export class MoniterService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getMoniterList(): Observable<Moniter[]>{
        return this.httpClient.get<Moniter[]>(`${this.baseURL}`);
        
    }

    createNewMoniter(moniter : Moniter):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, moniter);
    }

    getMoniterId(id: number):Observable<Moniter>{
        return this.httpClient.get<Moniter>(`${this.baseURL}/${id}`);
    }

    updateMoniter(id: number, moniter : Moniter): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, moniter);
    }

    deleteMoniter(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }





}