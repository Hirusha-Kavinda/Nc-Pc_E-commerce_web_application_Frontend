import { Injectable } from "@angular/core";
/* import { Subject } from "rxjs"; */
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Storage } from "./storage-model";


@Injectable({
    providedIn : 'root'
})

export class StorageService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getStorageList(): Observable<Storage[]>{
        return this.httpClient.get<Storage[]>(`${this.baseURL}`);
        
    }

    createNewStorage(storage : Storage):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, storage);
    }

    getStorageId(id: number):Observable<Storage>{
        return this.httpClient.get<Storage>(`${this.baseURL}/${id}`);
    }

    updateStorage(id: number, storage : Storage): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, storage);
    }

    deleteStorage(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

/* 
   cartSubject = new Subject<any>(); */



}