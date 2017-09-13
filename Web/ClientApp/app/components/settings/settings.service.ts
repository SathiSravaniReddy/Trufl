
import { Injectable } from "@angular/core";

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {    

    constructor(private http: Http) {
    }

    getUserDetails() {
        return this.http.get('assets/settings.json').map(
            (res) => res.json())

    }


   

   




}