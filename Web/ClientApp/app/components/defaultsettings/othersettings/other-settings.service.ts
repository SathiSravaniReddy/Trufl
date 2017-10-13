import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../../shared/appsettings';
import 'rxjs/add/operator/map';

@Injectable()
export class OtherSettingsService {
    private results: any;
    private diningexperience;

    constructor(private http: Http) {
    }
    public setDiningExperience(value) {
        this.diningexperience = value;
        localStorage.setItem('diningexperience', value);
    }

    public getDiningExperience() {
        this.diningexperience = localStorage.getItem('diningexperience');
        return this.diningexperience;
    }   
    getOtherSettingsDetails() {

        return this.http.get(constant.truflAPI + constant.truflBase + 'Admin/GetRestaurantSettings/1').map(
            (res) => res.json())

    }
    postOtherSettingsDetails(othersettingsinfo: any) {
        console.log(othersettingsinfo,"other settings info from service");
        return this.http.post('http://localhost:8679/api/Admin/SaveRestaurantSettings',othersettingsinfo).map(
            (res) => res.json()
        )
    }

}