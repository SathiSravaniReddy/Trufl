﻿
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
    private profileVisible = false;
    private showHeadings = true;
    private showSettings = false;
    private header1 = [
        {

            "name": "Waitlist",
            "active": true,
            "route": '/home'


        },
        {
            "name": "Seated",
            "active": false,
            "route": '/seated'
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
    
    constructor(private loginService: LoginService, private router: Router) {
        this.userType = this.loginService.getUserType(); 
    }
 
    logoutShow() {
        this.profileVisible = true;

    }
    
    settings() {
        
        
        
        this.router.navigateByUrl('/settings');
        this.showHeadings = false;
        this.showSettings = true;
        
    }

    
}
