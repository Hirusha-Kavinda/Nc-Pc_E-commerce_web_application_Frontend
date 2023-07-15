import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardCountService {
  private cardCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setCount(count: number): void {
    this.cardCountSubject.next(count);
  }

  getCount(): Observable<number> {
    return this.cardCountSubject.asObservable();
  }
}