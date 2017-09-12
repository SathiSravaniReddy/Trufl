import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginService} from '../shared/login.service'

@Injectable()
export class HostessSettingsService {    

    constructor(private http: Http, private loginservice: LoginService) {
       // this.loginservice.loginAuthentication
    }

    getUserDetails() {
        return this.http.get('http://localhost:8679/api/Trufl/GetRestaurantUserDetails/1/11/RA').map(
            (res) => res.json())

    }


    getTruflCustomers() {
        return this.http.get('assets/Trufl_customers.json').map(
            (res) => res.json())

    }

   




}