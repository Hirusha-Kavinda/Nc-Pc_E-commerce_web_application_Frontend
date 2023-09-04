import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { bill } from './admin.bill-model';

@Injectable({
  providedIn : 'root'
})
export class BillService {



  private baseURL = "http://localhost:8080/api/v1/getInfo"; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getBillById(id: number): Observable<bill> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<bill>(url);
  }
}