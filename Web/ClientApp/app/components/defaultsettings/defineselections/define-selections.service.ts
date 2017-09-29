
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DefineSelectionService {
    private results: any;
    constructor(private http: Http) {
    }

    getDefineSelectionDetails() {

        return this.http.get("assets/defineserver.json").map(
        (res) => res.json())

    }

}