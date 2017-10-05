import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GuestService {
    constructor(private http: Http) {

    }


    addGuestDetails(guestInfo: any) {
        console.log(guestInfo);
        return this.http.post('', guestInfo).map(
            (res) => res.json()
        )
    }

    getguestsdetails() {
        return this.http.get('assets/Guest.json').map(
            (res) => res.json()
        )

    }





}