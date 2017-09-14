import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
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
    private restarauntid: any;
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
    public setRestaruantId(value) {
        this.restarauntid = value;
        localStorage.setItem('restaruntid', value);
    }
    public getRestarauntId() {
        this.restarauntid = localStorage.getItem('restaruntid');
        return this.restarauntid;
    }
   
    getLoginDetails(userstype: any) {
       //this.http.get('http://localhost:8679/api/Trufl/GetUserTypes/' + userstype).map(
       //    (res: Response) => this.logindetails = res.json());
       // console.log(this.logindetails._Data);
        return this.http.get('http://localhost:8679/api/Trufl/GetUserTypes/' + userstype).map(
            (res:Response) => res.json());

    }

    loginAuthentication(user: any) {
        return this.http.post('http://localhost:8679/api/Trufl/LoginAuthentication',user ).map(
            (res: Response) => res.json());

    }

    forgotpassword(email: any) {

        return this.http.get('http://localhost:8679/api/Trufl/ForgetPassword?LoginEmail=' + email).map(
            (res: Response) => res.json());

    }

    resetPassword(reset: any) {
        return this.http.post('http://localhost:8679/api/Trufl/RestPassword', reset).map(
            (res: Response) => res.json());

    }

    create(user: User): Observable<User> {
        return this.http.post('http://localhost:8679/Api/Trufl/SignUp' , user).map(
            (res: Response) => res.json());

    }
    logout() {
        localStorage.removeItem("userType");
        
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