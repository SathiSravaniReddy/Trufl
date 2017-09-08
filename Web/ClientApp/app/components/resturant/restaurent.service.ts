import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestaurenService {
    constructor(private http: Http) {

    }
    public getRestaurentDetails() {

        return this.http.get('assets/restaurent.json').map(
            (res)=>res.json())

    }

   
}


