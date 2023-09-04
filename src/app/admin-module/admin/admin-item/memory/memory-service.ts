import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Memory } from "./memory-model";



@Injectable({
    providedIn : 'root'
})

export class MemoryService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getMemoryList(): Observable<Memory[]>{
        return this.httpClient.get<Memory[]>(`${this.baseURL}`);
        
    }

    createNewMemory(memory : Memory):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, memory);
    }

    getMemoryId(id: number):Observable<Memory>{
        return this.httpClient.get<Memory>(`${this.baseURL}/${id}`);
    }

    updateMemory(id: number, memory : Memory): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, memory);
    }

    deleteMemory(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }





}