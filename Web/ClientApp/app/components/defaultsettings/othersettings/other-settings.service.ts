import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../../shared/appsettings';
import 'rxjs/add/operator/map';

@Injectable()
export class OtherSettingsService {
    private results: any;
    constructor(private http: Http) {
    }

    getOtherSettingsDetails() {

        return this.http.get(constant.truflAPI + constant.truflBase + 'Admin/GetRestaurantSettings/1').map(
            (res) => res.json())

    }
    postOtherSettingsDetails(othersettingsinfo: any) {
        console.log(othersettingsinfo,"other settings info from service");
        return this.http.post('api/Admin/SaveRestaurant',othersettingsinfo[0]).map(
            (res) => res.json()
        )
    }

}