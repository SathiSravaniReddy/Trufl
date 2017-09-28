import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class OtherSettingsService {
    private results: any;
    constructor(private http: Http) {
    }

    getOtherSettingsDetails() {

        return this.http.post("assets/othersettings.json",'').map(
        (res) => res.json())

    }

}