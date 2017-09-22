import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service'; 
import { PaginationControlsComponent } from 'ngx-pagination';
@Component({
    selector:'hostessdashboard',
    templateUrl:'./hostessdashboard.component.html',
    styleUrls:['./hostessdashboard.component.css']
   
})
export class HostessDashboardComponent implements OnInit {
    private dashboardnotifications;
    constructor(private router: Router, private _dashboardservice: DashboardService) {
        

    }
   
    ngOnInit() {

    }
    waitList() {
        this.router.navigateByUrl('/waitlist');
    }
    restaraunt() {
        this.router.navigateByUrl('/seated');

    }

}