
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


@Injectable()

export class HostessService {

    constructor(private http: Http) {

    }
    public getTruflUserList() {
        console.log("Am in hostess");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8679/api/Trufl/GetTruflUserList', {
            headers: headers
        }).map(res => res.json() || {})
            .catch(this.handleError);
    }
    private handleError(error: any) {
        return 'Error';
    }

}

