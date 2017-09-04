import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
    //private userType = new Subject<string>();
    private results: any;
    private userType;
    constructor(private http: Http) {
    }
    public setUserType(value) {
        this.userType = value;
    }

    public getUserType() {
        return this.userType;
    }

  

    getLoginDetails(userstype:any) {
        return this.http.get('http://localhost:8679/api/Trufl/GetUserTypes/' + userstype).map(
            (res:Response) => res.json());

    }
/*getUsersList() {
    let headers = new Headers();
    headers.append('user_token', localStorage.getItem("token"));
    return this.http.get("http://183.82.48.194:8689/api-payroll/v1/api/payroll/dataentry/1962332", {headers: headers}).map((res: Response) => res.json());
  }*/
   
/*
    // Observable string streams
    userType$ = this.userType.asObservable();

    // Service message commands
    publishData(data: string) {
        this.userType.next(data);
        console.log(data,"userType");
    }
    */
}