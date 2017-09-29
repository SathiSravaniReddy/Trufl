import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { LoginService } from './login.service';
import { Router, RouterLinkActive } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate{
    private raRoutes;
    private taRoutes;
    private currentUrl;
    constructor(private _loginservice: LoginService, private router: Router) {
        this.raRoutes = ['/hostessdashboard', '/waitlist', 'hostesssettings', 'seated'];
        this.taRoutes = ['/dashboard', '/restaurant', 'settings'];
    }

    canActivate() {
        if (localStorage.userType !== null) {
            this.currentUrl = '/' + window.location.href.split('/')[window.location.href.split('/').length - 1];
            if (localStorage.userType === 'RA') {
                if (this.raRoutes.indexOf(this.currentUrl) >= 0 || this.currentUrl === '/login') {
                    console.log(this.currentUrl, "this.router.url");
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    localStorage.clear();
                }

            } else if (localStorage.userType === 'TA') {
                if (this.taRoutes.indexOf(this.currentUrl) >= 0 || this.currentUrl === '/login') {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    localStorage.clear();
                }

            } else {
                this.router.navigate(['/Login']);
                localStorage.clear();
            }
        } else {
            this.router.navigate(['/Login']);
            localStorage.clear();
        }
    }


}