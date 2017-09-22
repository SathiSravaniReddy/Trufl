import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { constant } from '../shared/appsettings';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeConfigService {
    public TruflUserType: any;
    public RestaurantID: any;

    constructor(private http: Http) {
    }

    getEmployeConfiguration(usertype: any, id: any) {
        this.TruflUserType = usertype;
        this.RestaurantID = id;
        console.log(this.TruflUserType);
        console.log(this.RestaurantID);
        return this.http.get(constant.truflAPI + constant.truflBase +'Hostess/' + "GetEmployeConfiguration/" + this.TruflUserType + "/" + this.RestaurantID).map(
            (res) => res.json())
    }


    /* GET api/Hostess/GetEmployeConfiguration/{TruflUserType}/{RestaurantID} */


    editEmployeConfiguration(items: any) {
        console.log(items);
        return this.http.post(constant.truflAPI + constant.truflBase +'Hostess/'+ 'UpdateRestaurantEmployee', items).map(
            (res) => res.json())
    }
    saveEmployeConfiguration(items: any) {
        console.log(items);
        return this.http.post(constant.truflAPI + constant.truflBase+'Trufl/' + 'SignUp', items).map(
            (res) => res.json())
    }

    updatehoststatus(updateitems: any) {

        return this.http.post(constant.truflAPI + constant.truflBase + 'Hostess/' + 'UpdateRestaurantHostStatus', updateitems).map(
            (res) => res.json())

    }


    /*constant.truflAPI + constant.truflBase + 'Hostess/' + 'UpdateRestaurantHostStatus'*/


    /*api/Hostess/UpdateRestaurantEmployee          */
   

    /* getSeatedDetails() {
         return this.http.get(constant.truflAPI + constant.truflBase + 'GetSeatedUsersList/1').map(
             (res) => res.json())
 
     }*/

    /* postSeatedDetails(seatedInfo: any) {
         this.seatsdetails = seatedInfo;
 
         return this.http.post(constant.truflAPI + constant.truflBase + 'SaveSeatBookingUsersList', this.seatsdetails).map(
             (res) => res.json()
         )
     } */




}