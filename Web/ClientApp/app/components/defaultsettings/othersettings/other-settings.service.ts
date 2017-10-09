import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class OtherSettingsService {
    private results: any;
    constructor(private http: Http) {
    }

  
    postOtherSettingsDetails(othersettingsinfo: any) {
        console.log(othersettingsinfo,"other settings info from service");
        return this.http.post('', othersettingsinfo).map(
            (res) => res.json()
        )
    }

}