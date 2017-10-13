import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {
    public RestaurentId:any
    constructor(private http: Http) {

    }
    getStaffDetails() {
        this.RestaurentId = 1;
        return this.http.get('http://localhost:8679/api/WaitListUser/GetRestaurantHostessOpenSectionDetails/1/RH').map(
            (res) => res.json()
        )
    } 

    postStaffDetails(staff_info:any) {
        console.log(staff_info);
        return this.http.post('http://localhost:8679/api/WaitListUser/SaveRestaurantOpenSectionStaff',staff_info).map((res) => {
            (res) => res.json();
        })
    }
    getFloorNames() {
        this.RestaurentId = 1;
        return this.http.get('http://localhost:8679/api/WaitListUser/GetRestaurantOpenSections/' + this.RestaurentId).map(
            (res) =>res.json())
    }     
}