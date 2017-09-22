
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
    private showDashboard = true;
 
    public loadHeaders = {};
    public headers = [];
  
   
    constructor(private loginService: LoginService, private router: Router) {
        this.userType = this.loginService.getUserType();
        this.restaurantName = this.loginService.getRestaurantName();
        console.log(this.restaurantName, "  this.restaurantName");
       

        //if ((router.url != "/hostesssettings") && (router.url != "/settings") && (router.url != "/hostessdashboard")){
        //    this.isSettings = true;
          
        //}  


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

        
        this.headers.map(function (obj) {
            obj.isShow=router.url == obj.route;
            })
       

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
