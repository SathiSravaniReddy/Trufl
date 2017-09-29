
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
    private profileVisible:boolean = false;
    private showHeadings = true;
    public isSettings = false;
    private showDashboard = true;
    private employeeVisible: boolean = false;
    public loadHeaders = {};
    public headers = [];
  
   
    constructor(private loginService: LoginService, private router: Router) {
        this.userType = this.loginService.getUserType();
        this.userName = this.loginService.getUserName();
        //Keep these load headers in a service-----
        this.loadHeaders = {
            "RA": [
                {
                    "name": "HostessDashboard",
                    "active": true,
                    "route": '/hostessdashboard'
                },
            {
                "name": "Waitlist",
                "active": false,
                "route": '/waitlist'
            },
            {
                "name": "Seated",
                "active": false,
                "route": '/seated'
            },
            {
               
                "name": "Settings",
                "active": true,
                "route": '/hostesssettings'
            }
        ],
           "TA": [
               {
                "name": "Dashboard",
                "active": true,
                "route": '/dashboard'
                },
               {
                "name": "Restaurant",
                "active": false,
                "route": '/restaurant'
               },
               {
                   "name": "Settings",
                   "active": true,
                   "route": '/settings'
               }
           ]

        };

        this.headers = this.loadHeaders[this.userType];

        if ((router.url === '/waitlist') || (router.url === '/seated')) {
            this.headers.map(function (obj, index) {
                if ([0,1, 2].indexOf(index) >= 0) {
                    obj.isShow = true;
                } else {
                    obj.isShow = false;
                }
            });
            
        }

        if ((router.url === '/hostessdashboard') || (router.url === '/hostesssettings') || (router.url === '/settings')) {
            this.headers.map(function (obj, index) {
                obj.isShow = obj.route == router.url;
            });
        }
        
        if ((router.url === '/dashboard') || (router.url === '/restaurant')) {
            this.headers.map(function (obj, index) {
                if ([0, 1].indexOf(index) >= 0) {
                    obj.isShow = true;
                } else {
                    obj.isShow = false;
                }
            });

        }
       

    }
 
    logoutShow() {
        this.profileVisible = this.profileVisible == false?true:false;
        if (this.userType == "RA") {
            this.employeeVisible = true;
        }
       
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
