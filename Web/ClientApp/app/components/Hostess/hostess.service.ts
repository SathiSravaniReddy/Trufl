
import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


@Injectable()

export class HostessService {

    constructor(private http: Http) {

    }

    //Service for Users List display
    public getTruflUserList() {
   
        return this.http.get('http://localhost:8679/api/Trufl/GetWaitListUsers')
.map(res => res.json() || {})
            .catch(this.handleError);
    }

    //Service for Accept and Remove
    public acceptedandremovedwaiteduser(bookingid, bookinstatus) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8679/api/Trufl/AcceptedandRemovedWaitedUser/' + bookingid + '/' + bookinstatus, { headers: headers })
            .map(res => res.json() || {})
    }

    //Service for Restaurant table amount
    public getRestaurantTableAmount(restaurantId, tableNo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8679/api/Trufl/GetRestaurantTableAmount/' + restaurantId + '/' + tableNo, { headers: headers })
            .map(res => res.json() || {})
    }

    //Service for get Restaurant tables 
    public getRestaurantTables(restaurantId, tableNo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8679/api/Trufl/GetRestaurantTables/' + restaurantId + '/' + tableNo, { headers: headers })
            .map(res => res.json() || {})
    } 

    //Handling errors
    private handleError(error: any) {
        return 'Error';
    }

}

