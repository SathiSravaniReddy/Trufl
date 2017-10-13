import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GuestService {
    constructor(private http: Http) {

    }


    addGuestDetails(guestInfo: any, number: any) {
        console.log(number);
        console.log(guestInfo);

        if (number == 1) {

            console.log("coming1");
            return this.http.post('', guestInfo).map(
                (res) => res.json()
            )
        }
        else {
            console.log("coming2");
            return this.http.post('', guestInfo).map(
                (res) => res.json()
            )
        }
       
    }

    getguestsdetails() {
        return this.http.get('assets/Guest.json').map(
            (res) => res.json()
        )

    }





}