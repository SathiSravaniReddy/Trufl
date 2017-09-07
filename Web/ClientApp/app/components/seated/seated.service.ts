import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SeatedService {
    private results: any;
    public seatedInfo: any;
    public data: any;
    public seatsdetails: any;

    constructor(private http: Http) {
    }

    getSeatedDetails() {
        console.log("into service");
        return this.http.get('http://localhost:8679/api/Trufl/GetSeatedUsersList/1').map(
            (res) => res.json())

    }

    postSeatedDetails(seatedInfo: any) {
        this.seatsdetails = seatedInfo;
        console.log(this.seatsdetails);

        /*  let body = JSON.stringify(
              seatedInfo
          )
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
  
         
  
          return this.http.post(
              'http://localhost:8679/api/Trufl/SaveSeatBookingUsersList', body, {
                  headers: headers
              }).map(res => res.json()).subscribe(
              data => { console.log(data); },
              err => { console.log(err); }
              );
          */
        return this.http.post('http://localhost:8679/api/Trufl/SaveSeatBookingUsersList', this.seatsdetails).map(
            (res) => res.json()
        )
    }




}