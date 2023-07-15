import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { KeyboardM } from "./keyboard-m-model";


@Injectable({
    providedIn : 'root'
})

export class KeyboardMService {

    private baseURL = "http://localhost:8080/api/v1/device";


    constructor(private httpClient: HttpClient){}



    getKeyboardMList(): Observable<KeyboardM[]>{
        return this.httpClient.get<KeyboardM[]>(`${this.baseURL}`);
        
    }

    createNewKeyboardM (keyboardM: KeyboardM):Observable<any>{
        return this.httpClient.post(`${this.baseURL}`, keyboardM);
    }

    getKeyboardMId(id: number):Observable<KeyboardM>{
        return this.httpClient.get<KeyboardM>(`${this.baseURL}/${id}`);
    }

    updateKeyboardM (id: number, keyboardM : KeyboardM): Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`, keyboardM);
    }

    deleteKeyboardM (id : number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }


   cartSubject = new Subject<any>();



}