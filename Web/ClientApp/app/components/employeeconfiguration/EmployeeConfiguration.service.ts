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
       
        return this.http.get(constant.truflAPI + constant.truflBase +'Hostess/' + "GetEmployeConfiguration/" + this.TruflUserType + "/" + this.RestaurantID).map(
            (res) => res.json())
    }

      


    editEmployeConfiguration(items: any) {
       
        return this.http.post(constant.truflAPI + constant.truflBase +'Hostess/'+ 'UpdateRestaurantEmployee', items).map(
            (res) => res.json())
    }
    saveEmployeConfiguration(items: any) {       
        return this.http.post(constant.truflAPI + constant.truflBase+'/SignUp', items).map(
            (res) => res.json())
    }
    


    updatehoststatus(updateitems: any) {

        return this.http.post(constant.truflAPI + constant.truflBase + 'Hostess/' + 'UpdateRestaurantHostStatus', updateitems).map(
            (res) => res.json())

    }

    

}