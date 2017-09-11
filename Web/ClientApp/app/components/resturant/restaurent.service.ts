import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestaurenService {
    public restaurentdetails: any;

    constructor(private http: Http) {

    }
    public getRestaurentDetails() {
        return this.http.get('assets/restaurent.json').map(
            (res)=>res.json())
    }

    public getnotifications() {
        return this.http.get('http://localhost:8679/api/Trufl/Admin/GetNotifications').map(
            (res) => res.json())
    }





    addRestaurentDetails(restaurentInfo: any) {
        this.restaurentdetails = restaurentInfo;
        console.log(this.restaurentdetails);
        return this.http.post('', this.restaurentdetails).map(
            (res) => res.json()
        )
    }

   
}


