import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { constant } from '../shared/appsettings';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { User } from '../Login/user';

@Injectable()
export class LoginService {
    private results: any;
    private userType;
    private settingStatus;
    private logindetails;
    private truflid: any;
    private restaurantid: any;
    private restaurantName;
    private user;
    constructor(private http: Http) {
    }
    public setUserType(value) {
        this.userType = value;
        localStorage.setItem('userType',value );
    }

    public getUserType() {
        this.userType = localStorage.getItem('userType');
        return this.userType;
    }   

    public setTrufluserID(value) {
        this.truflid = value;
        localStorage.setItem('truflid', value);
    }
    public getTrufluserID() {
        this.truflid = localStorage.getItem('truflid');
        return this.truflid;
}
    public setRestaurantId(value) {
        this.restaurantid = value;
        localStorage.setItem('restaurantid', value);
    }
    public getRestaurantId() {
        this.restaurantid = localStorage.getItem('restaurantid');
        return this.restaurantid;
    }
    public setRestaurantName(value) {
        this.restaurantName = value;
        localStorage.setItem('restaurantName', value);
    }
    public getRestaurantName() {
        this.restaurantName = localStorage.getItem('restaurantName');
        return this.restaurantName;
    }
    public setUser(value) {
        this.user = value;
    }
    public getUser() {
        return this.user;
    }
    //To get User Details
    getLoginDetails(userstype: any,restaurantid) {
        return this.http.get(constant.truflAPI + constant.truflBase + 'GetUserTypes/' + userstype + '/' + restaurantid).map(
            (res:Response) => res.json());

    }

    //To get Login Member Type
    loginAuthentication(user: any) {
        return this.http.post(constant.truflAPI + constant.truflBase + 'LoginAuthentication',user ).map(
            (res: Response) => res.json());

    }

    //To get an email when click on forgot password
    forgotpassword(email: any) {

        return this.http.get(constant.truflAPI + constant.truflBase + 'ForgetPassword?LoginEmail=' + email).map(
            (res: Response) => res.json());

    }

    //To reset password
    resetPassword(reset: any) {
        return this.http.post(constant.truflAPI + constant.truflBase + 'RestPassword', reset).map(
            (res: Response) => res.json());

    }

    //To register new user
    create(user: any) {
        return this.http.post(constant.truflAPI + constant.truflBase + 'SignUp' , user).map(
            (res: Response) => res.json());

    }

    //To logout
    logout() {
        localStorage.removeItem("userType");
        localStorage.removeItem("truflid");
        localStorage.removeItem("restaurantid");
        localStorage.removeItem("restaurantName");
        
    }

    public handleError(error: any) {
           console.error('handleError', error);
           let response = {
                status: error.status,
                message: error.statusText
           };
           try {
                response.message = error.json()._statusMessage;
           } catch (e) {
                    console.log('could not parse body', e);
           }
       return Observable.throw(response);
     }


}