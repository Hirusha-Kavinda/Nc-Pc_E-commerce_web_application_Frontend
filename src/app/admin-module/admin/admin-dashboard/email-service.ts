import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailApiUrl = 'http://localhost:8080/sendmail';

  constructor(private http: HttpClient) {}

  sendEmail(email: { to: string, subject: string, message: string }): Observable<void> {
    return this.http.post<void>(this.emailApiUrl, email);
  }
}