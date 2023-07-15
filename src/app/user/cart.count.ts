import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
    providedIn : 'root'
})


export class cartCount {


cartSubject = new Subject<any>();

}