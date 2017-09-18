
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../shared/appsettings';

import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {

    constructor(private http: Http) {

    }

    getUserDetails(usertype, restarauntid, truflid) {
        return this.http.get(constant.truflAPI + constant.truflBase + 'GetRestaurantUserDetails'  +'/' + restarauntid + '/' + truflid + '/' + usertype).map(
            (res) => res.json())

    }




    PostProfileEdit(user) {
        return this.http.post(constant.truflAPI + constant.truflBase + 'Admin'+'/'+ 'SaveProfilePassword', user).map(
            (res) => res.json());
    }




}