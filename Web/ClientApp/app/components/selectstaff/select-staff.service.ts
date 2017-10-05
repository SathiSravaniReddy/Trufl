import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {
    constructor(private http: Http) {

    }


    getStaffDetails() {      
        return this.http.get('assets/staff.json').map(
            (res) => res.json()
        )
    }

    





}