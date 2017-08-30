import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SeatedService {
    private results: any;
    constructor(private http: Http) {
    }

    getSeatedDetails() {
        console.log("into service");
        return this.http.get('assets/seated.json').map(
            (res) => res.json())

    }
}