import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginService} from '../shared/login.service'

@Injectable()
export class HostessSettingsService {    

    constructor(private http: Http, private loginservice: LoginService) {
       // this.loginservice.loginAuthentication
    }

    //Get API for settings page
    getUserDetails() {
        return this.http.get('http://localhost:8679/api/Trufl/GetRestaurantUserDetails/1/11/RA').map(
            (res) => res.json())

    }

    //Get API for Bio categories
    GetBioCategories() {
        return this.http.get('http://localhost:8679/api/Trufl/GetBioCategories').map(
            (res) => res.json())
    }
   
    //Get API for BioEvents based on categories
   
    GetBioEvents(categoryId) {
        return this.http.get('http://localhost:8679/api/Trufl/GetBioEvents/' + categoryId).map(
            (res) => res.json())
    }




}