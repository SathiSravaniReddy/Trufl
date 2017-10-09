import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../shared/appsettings';

import 'rxjs/add/operator/map';

@Injectable()

export class HostessService {

    constructor(private http: Http) {

    }

    //Service for Users List display
    public getTruflUserList() {

        return this.http.get(constant.truflAPI + constant.truflBase + 'WaitListUser/GetWaitListUsers')
            .map(res => res.json() || {})
            .catch(this.handleError);
    }
    public getBioInformation(restaurantId, truflUid, usertype) {
        return this.http.get(constant.truflAPI + constant.truflBase + 'Hostess/GetRestaurantUserDetails/' + restaurantId + '/' + truflUid + '/' + usertype)
            .map(res => res.json() || {})
            .catch(this.handleError);
    }
    //Service for Accept and Remove
    public acceptedandremovedwaiteduser(bookingid, bookinstatus) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(constant.truflAPI + constant.truflBase + 'WaitListUser/AcceptedandRemovedWaitedUser/' + bookingid + '/' + bookinstatus, { headers: headers })
            .map(res => res.json() || {})
    }

    //Service for Restaurant table amount
    public getRestaurantTableAmount(restaurantId, tableNo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(constant.truflAPI + constant.truflBase + 'WaitListUser/GetRestaurantTableAmount/' + restaurantId + '/' + tableNo, { headers: headers })
            .map(res => res.json() || {})
    }

    //Service for get Restaurant tables 
    public getRestaurantTables(restaurantId, tableNo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(constant.truflAPI + constant.truflBase + 'Hostess/GetRestaurantTables/' + restaurantId + '/' + tableNo, { headers: headers })
            .map(res => res.json() || {})
    }

    //Service for updating booking
    public updateBooking(seatedInfo) {
        return this.http.post(constant.truflAPI + constant.truflBase + 'WaitListUser/UpdateBooking', seatedInfo).map(
            (res) => res.json()
        )
    }

    //Handling errors
    private handleError(error: any) {
        return 'Error';
    }

}

