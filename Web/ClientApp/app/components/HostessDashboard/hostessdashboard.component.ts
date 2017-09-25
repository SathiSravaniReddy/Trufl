import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service'; 
import { RestaurenService} from '../resturant/restaurent.service';
import { PaginationControlsComponent } from 'ngx-pagination';
@Component({
    selector:'hostessdashboard',
    templateUrl:'./hostessdashboard.component.html',
    styleUrls:['./hostessdashboard.component.css']
   
})
export class HostessDashboardComponent implements OnInit {

    private dashboardnotifications;
    constructor(private router: Router, private _dashboardservice: DashboardService, private _restaraunt: RestaurenService) {
        this.getnotifications();
       
    }
   
    ngOnInit() {

    }
    waitList() {
        this.router.navigateByUrl('/waitlist');
    }
    restaraunt() {
        this.router.navigateByUrl('/seated');

    }



    public getnotifications() {



        this._restaraunt.getnotifications().subscribe((res: any) => {
            this.dashboardnotifications = res._Data;
            //console.log(this.dashboardnotifications, "this.notifications_info");

        })

    }


}