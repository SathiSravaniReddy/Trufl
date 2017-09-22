
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
    private userName;
    private profileVisible = false;
    private showHeadings = true;
    public isSettings = false;
    private showDashboard = true;
 
    public loadHeaders = {};
    public headers = [];
  
   
    constructor(private loginService: LoginService, private router: Router) {
        this.userType = this.loginService.getUserType();
        this.userName = this.loginService.getUserName();
        console.log(this.userName);
        if ((router.url != "/hostesssettings") && (router.url != "/settings") && (router.url != "/hostessdashboard")){
            this.isSettings = true;
          
        }  
     
        if (router.url == "/hostessdashboard") {
            this.showDashboard = false;
        }
        //Keep these load headers in a service-----
        this.loadHeaders = {
            "RA": [
                {
                    "isShowDashboard": !this.showDashboard,
                    "name": "HostessDashboard",
                    "active": true,
                    "route": '/hostessdashboard'
                },
            {
                "isSettings": this.isSettings,
                "name": "Waitlist",
                "active": false,
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
                "isShowDashboard": this.showDashboard,
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
                   "isShowDashboard":this.showDashboard,
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
            this.router.navigateByUrl('/hostessdashboard');
        }
        else if (this.userType === "TA"){
            this.router.navigateByUrl('/dashboard');
        }
    }
    logout() {
        this.loginService.logout();
        this.router.navigateByUrl('/login');
    }

    getEmployee() {

        this.router.navigate(['employeeconfiguration']);
    }
}
