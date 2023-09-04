import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { VgaUser } from "./vga-user-model";
import { Router } from "@angular/router";


@Injectable({
    providedIn : 'root'
})

export class VgaUserService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient ){}



    getMbTestList(): Observable<VgaUser[]>{
        return this.httpClient.get<VgaUser[]>(`${this.baseURL}`);
        
    }

    


   cartSubject = new Subject<any>();



}