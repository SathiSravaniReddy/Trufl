import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../shared/appsettings';
import 'rxjs/add/operator/map';

@Injectable()
export class HostessDashboardService {
    private results: any;
    constructor(private http: Http) {
    }

    getDashboardDetails() {
     
        //return this.http.post(constant.truflAPI + constant.truflBase + 'Admin' + '/' + 'GetDashBoardDetails', date).map(
        //    (res) => res.json())

    }

}