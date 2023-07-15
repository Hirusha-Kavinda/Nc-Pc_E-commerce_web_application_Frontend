import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MotherboardUser } from "./motherboard-user-model";


@Injectable({
    providedIn : 'root'
})

export class MotherboardUserService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getMotherboardList(): Observable<MotherboardUser[]>{
        return this.httpClient.get<MotherboardUser[]>(`${this.baseURL}`);
        
    }

    getMotherboardId(id: number):Observable<MotherboardUser>{
        return this.httpClient.get<MotherboardUser>(`${this.baseURL}/${id}`);
    }


   cartSubject = new Subject<any>();



}