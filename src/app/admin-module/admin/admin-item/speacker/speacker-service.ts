import { Injectable } from "@angular/core";
/* import { Subject } from "rxjs"; */
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Speacker } from "./speacker-model";


@Injectable({
    providedIn : 'root'
})

export class SpeackerService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getSpeackerList(): Observable<Speacker []>{
        return this.httpClient.get<Speacker []>(`${this.baseURL}`);
        
    }

    createNewSpeacker(speacker : Speacker ):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, speacker);
    }

    getSpeackerId(id: number):Observable<Speacker >{
        return this.httpClient.get<Speacker >(`${this.baseURL}/${id}`);
    }

    updateSpeacker(id: number, speacker : Speacker ): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, speacker);
    }

    deleteSpeacker(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

/* 
   cartSubject = new Subject<any>(); */



}