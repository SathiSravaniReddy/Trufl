import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

    private _guestDetails: object;
    public arraydata:any[] = [];
 
     get guestDetails(): object {
         return this._guestDetails;
     }
 
 
     set guestDetails(value: object) {
         this._guestDetails = value;
     }


     get arrayData(): any {
         return this.arraydata;
     }


     set arrayData(value: any) {
         this.arraydata = value;
     }
  
    
}

