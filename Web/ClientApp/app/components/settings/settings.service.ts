
import { Injectable } from "@angular/core";

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {    

    constructor(private http: Http) {
    }

    getUserDetails(usertype,restarauntid,truflid) {
        return this.http.get('http://localhost:8679/api/Trufl/GetRestaurantUserDetails/' + restarauntid +'/'+ truflid +'/'+ usertype).map(
            (res) => res.json())
      
    }


   

   




}