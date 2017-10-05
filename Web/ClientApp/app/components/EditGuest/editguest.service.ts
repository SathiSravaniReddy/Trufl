import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class EditGuestService {
    constructor(private http: Http) {

    }


    editGuestDetails(guestInfo: any) {
        console.log(guestInfo);
        return this.http.post('', guestInfo).map(
            (res) => res.json()
        )
    }







}