import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

     private _guestDetails: object;
 
     get guestDetails(): object {
         return this._guestDetails;
     }
 
 
     set guestDetails(value: object) {
         this._guestDetails = value;
     }

  /*  private subject = new Subject<any>();

    sendMessage(message: object) {

        this.subject.next({ text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable()
    }

    clearMessage() {
        this.subject.next();
    }
    */
}

