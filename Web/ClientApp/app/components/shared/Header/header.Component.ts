
import { Component, OnInit} from '@angular/core';
import { LoginService } from '../login.service';
import { Router, RouterLinkActive  } from '@angular/router';

@Component({
    selector: 'shared-header',
    templateUrl: './header.Component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent {
    private userType;
    private restaurantName;
    private profileVisible = false;
    private showHeadings = true;
    public isSettings = false;
    public loadHeaders = {};
    public headers = [];

      
    constructor(private loginService: LoginService, private router: Router) {
        this.userType = this.loginService.getUserType();
        this.restaurantName = this.loginService.getRestaurantName();
        if ((router.url != "/hostesssettings") && (router.url != "/settings")) {
            this.isSettings = true;
        }  

        //Keep these load headers in a service-----
        this.loadHeaders = {"RA":[
            {
                "isSettings": this.isSettings,
                "name": "Waitlist",
                "active": true,
                "route": '/waitlist'
            },
            {
                "isSettings": this.isSettings,
                "name": "Seated",
                "active": false,
                "route": '/seated'
            },
            {
                "isSettings": !this.isSettings,
                "name": "Settings",
                "active": true,
                "route": '/hostesssettings'
            }
        ],
           "TA": [
               {
                "isSettings": this.isSettings,
                "name": "Dashboard",
                "active": true,
                "route": '/dashboard'
                },
               {
                "isSettings": this.isSettings,
                "name": "Restaurant",
                "active": false,
                "route": '/restaurant'
               },
               {
                   "isSettings": !this.isSettings,
                   "name": "Settings",
                   "active": true,
                   "route": '/settings'
               }
           ]

        };

        this.headers = this.loadHeaders[this.userType];

    }
 
    logoutShow() {
        this.profileVisible = true;
    }

    showHeaders() {
        if (this.userType === "RA") {
            this.router.navigateByUrl('/waitlist');
        }
        else if (this.userType === "TA"){
            this.router.navigateByUrl('/dashboard');
        }
    }
    logout() {
        this.loginService.logout();
        this.router.navigateByUrl('/login');
    }
}
