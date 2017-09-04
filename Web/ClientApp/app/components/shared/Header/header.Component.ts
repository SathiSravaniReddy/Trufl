
import { Component } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
    selector: 'shared-header',
    templateUrl: './header.Component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent {
    private userType;
    private header1 = [
        {

            "name": "Waitlist",
            "active": true,
            "route": '/home'


        },
        {
            "name": "Seated",
            "active": false,
            "route": '/getseatedpage'
        }];
    private header2 = [
        {
            "name": "Dashboard",
            "active": true,
            "route": '/dashboard'
        },
        {
            "name": "Restaurant",
            "active": false,
            "route": '/restaurant'
        }];
    
    constructor(private loginService: LoginService) {
        this.userType = this.loginService.getUserType(); 
        console.log(this.userType, "headerUserType");
        //this.header1TabFn(0);
        //this.header2TabFn(0);
    }

    public header1TabFn(index: any) {
        this.header1.map(function (obj: any, innerIndex: any) {
            obj.active=(innerIndex === index) ? true : false;
        });
    }
    public header2TabFn(index: any) {
        this.header2.map(function (obj: any, innerIndex: any) {
            obj.active = (innerIndex === index) ? true : false;
        });
    }
   
}
