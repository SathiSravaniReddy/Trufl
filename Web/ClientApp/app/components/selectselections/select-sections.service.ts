import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class SelectService {
    public RestaurentId: any;
    constructor(private http: Http) {
    }
    getDetails() {
        this.RestaurentId = 1;
        return this.http.get('http://localhost:8679/api/WaitListUser/GetRestaurantOpenSections/'+this.RestaurentId).map(
            (res) => res.json()
        )
    }

    updateselection(selectiondetails: any) {         
        return this.http.post('http://localhost:8679/api/WaitListUser/UpdateRestaurantActiveSections',selectiondetails).map(
            (res) => res.json()
        )

    }
   }