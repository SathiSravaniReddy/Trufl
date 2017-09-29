import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../shared/appsettings';
import 'rxjs/add/operator/map';

@Injectable()
export class SeatedService {
    private results: any;
    public seatedInfo: any;
    public data: any;
    public seatsdetails: any;

    constructor(private http: Http) {
    }

    getSeatedDetails() {       
        return this.http.get(constant.truflAPI + constant.truflBase + 'Hostess/' + 'GetSeatedUsersList/1').map(
            (res) => res.json())

    }


 

    postSeatedDetails(seatedInfo: any) {
        this.seatsdetails = seatedInfo;
       
        return this.http.post(constant.truflAPI + constant.truflBase +'Hostess/' + 'SaveSeatBookingUsersList', this.seatsdetails).map(
            (res) => res.json()
        )
    }

   




}