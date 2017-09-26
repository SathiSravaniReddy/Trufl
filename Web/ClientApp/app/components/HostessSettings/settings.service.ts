import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../shared/appsettings';
import 'rxjs/add/operator/map';
import {LoginService} from '../shared/login.service'

@Injectable()
export class HostessSettingsService {    

    constructor(private http: Http, private loginservice: LoginService) {
       // this.loginservice.loginAuthentication
    }

    //Get API for settings page
    getUserDetails(usertype, truflid, restaurantid) {
        return this.http.get(constant.truflAPI + constant.truflBase + 'Hostess/GetRestaurantUserDetails/' + restaurantid + '/' + truflid + '/' + usertype).map(
            (res) => res.json());

    }

    //Get API for Bio categories
    GetBioCategories() {
        return this.http.get(constant.truflAPI + constant.truflBase + 'Hostess/GetBioCategories').map(
            (res) => res.json());
    }
   
    //Get API for BioEvents based on categories 
    GetBioEvents(categoryId) {
        return this.http.get(constant.truflAPI + constant.truflBase + 'Hostess/GetBioEvents/' + categoryId).map(
            (res) => res.json());
    }

    //Post API for AddUserBioEvents
    AddUserBioEvents(bio) {
        return this.http.post(constant.truflAPI + constant.truflBase + 'Hostess/SaveUserBioEvents', bio).map(
            (res) => res.json());
    }

    //Post Api for Edit Profile
    PostProfileEdit(user) {
        return this.http.post(constant.truflAPI + constant.truflBase + 'AdminLogin/SaveProfilePassword', user).map(
            (res) => res.json());
    }
}