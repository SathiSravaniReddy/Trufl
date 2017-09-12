import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HostessSettingsService {    

    constructor(private http: Http) {
    }

    getUserDetails() {
        return this.http.get('assets/settings.json').map(
            (res) => res.json())

    }


    getTruflCustomers() {
        return this.http.get('assets/Trufl_customers.json').map(
            (res) => res.json())

    }

   




}