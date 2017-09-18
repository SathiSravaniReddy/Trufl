import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../shared/appsettings';
import 'rxjs/add/operator/map';

@Injectable()
export class RestaurenService {
    public restaurentdetails: any;
    private notificationdetails: any;

    constructor(private http: Http) {

    }
    public getRestaurentDetails() {
        return this.http.get('assets/restaurent.json').map(
            (res) => res.json())
    }

    public getnotifications() {
        return this.http.get(constant.truflAPI + constant.truflBase + 'Admin' + '/' + 'GetNotifications').map(
            (res) => res.json())
    }





    addRestaurentDetails(restaurentInfo: any) {
        this.restaurentdetails = restaurentInfo;
        console.log(this.restaurentdetails);
        return this.http.post('', this.restaurentdetails).map(
            (res) => res.json()
        )
    }
    onSubmitNotifications(notificationInfo: any) {
        this.notificationdetails = notificationInfo;
        console.log(this.notificationdetails);

        return this.http.post(constant.truflAPI + constant.truflBase + 'Admin' + '/' +'SaveNotifications', this.notificationdetails).map(
            (res) => res.json()
        )
    }

}



