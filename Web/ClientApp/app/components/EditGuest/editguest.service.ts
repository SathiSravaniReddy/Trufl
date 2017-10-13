import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class EditGuestService {
    constructor(private http: Http) {

    }


    editGuestDetails(guestInfo: any, number: any) {

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







}