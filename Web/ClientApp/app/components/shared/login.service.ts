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
    

    getLoginDetails(userstype:any) {
   
        return this.http.get('http://localhost:8679/api/Trufl/GetUserTypes/' + userstype).map(
            (res:Response) => res.json());

    }

    loginAuthentication(user: any) {
        console.log(user);
        return this.http.post('http://localhost:8679/api/Trufl/LoginAuthentication',user ).map(
            (res: Response) => res.json());

    }

    forgotpassword(email: any) {

        return this.http.get('http://localhost:8679/api/Trufl/ForgetPassword?LoginEmail=' + email).map(
            (res: Response) => res.json());

    }
    

    create(user: User): Observable < User > {
        return this.http.get('assets/login.json')
                // ...and calling .json() on the response to return data
                .map((res: Response) => res.json().data.filter(data => data.userName === user.emailid && data.password === user.password)[0])
               //...errors if any
                .catch(this.handleError);
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