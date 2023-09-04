import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Processor } from "./processor-model";




@Injectable({
    providedIn : 'root'
})

export class ProcessorService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getProcessorList(): Observable<Processor[]>{
        return this.httpClient.get<Processor[]>(`${this.baseURL}`);
        
    }

    createNewProcessor(processor : Processor):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, processor);
    }

    getProcessorId(id: number):Observable<Processor>{
        return this.httpClient.get<Processor>(`${this.baseURL}/${id}`);
    }

    updateProcessor(id: number, processor : Processor): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, processor);
    }

    deleteProcessor(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }





}