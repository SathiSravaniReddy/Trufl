
import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


@Injectable()

export class HostessService {

    constructor(private http: Http) {

    }
    public getTruflUserList() {
   
        return this.http.get('http://localhost:8679/api/Trufl/GetWaitListUsers')
.map(res => res.json() || {})
            .catch(this.handleError);
    }
    public acceptedandremovedwaiteduser(bookingid, bookinstatus) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8679/api/Trufl/AcceptedandRemovedWaitedUser/' + bookingid + '/' + bookinstatus, { headers: headers })
            .map(res => res.json() || {})
    }
    private handleError(error: any) {
        return 'Error';
    }

}

