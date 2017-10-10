import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../../shared/appsettings';
import 'rxjs/add/operator/map';

@Injectable()
export class ManageServersService {
    private results: any;
    constructor(private http: Http) {
    }

    getManageServersDetails() {

        return this.http.get(constant.truflAPI + constant.truflBase + 'WaitListUser/GetRestaurantHostessOpenSectionDetails/1/RH').map(
            (res) => res.json())

    }

}
