import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Vga } from "./vga-model";



@Injectable({
    providedIn : 'root'
})

export class VgaService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getVgaList(): Observable<Vga[]>{
        return this.httpClient.get<Vga[]>(`${this.baseURL}`);
        
    }

    createNewVga(vga : Vga):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, vga);
    }

    getVgaId(id: number):Observable<Vga>{
        return this.httpClient.get<Vga>(`${this.baseURL}/${id}`);
    }

    updateVga(id: number, vga : Vga): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, vga);
    }

    deleteVga(id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }





}