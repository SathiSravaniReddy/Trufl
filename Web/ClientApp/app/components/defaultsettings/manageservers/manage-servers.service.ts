import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ManageServersService {
    private results: any;
    constructor(private http: Http) {
    }

    getManageServersDetails() {

        //return this.http.post(constant.truflAPI + constant.truflBase + 'Admin' + '/' + 'GetDashBoardDetails', date).map(
        //    (res) => res.json())

    }

}
