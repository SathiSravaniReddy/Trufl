﻿
import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


@Injectable()

export class HostessService {

    constructor(private http: Http) {

    }
    public getTruflUserList() {
        console.log("Am in hostess");
   
        return this.http.get('http://localhost:8679/api/Trufl/GetWaitListUsers')
.map(res => res.json() || {})
            .catch(this.handleError);
    }
    private handleError(error: any) {
        return 'Error';
    }

}

