import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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


    loginAuthentication(user: User) {
        
    }

}