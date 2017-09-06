﻿
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from './user';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private logininfo:any;
    private restaurantAdmin;
    private truflAdmin;
    private userType;
    private user = new User();

constructor(private loginService:LoginService, private router:Router ){
    
}
 signIn() {
     if (this.restaurantAdmin == 'TR') {
         this.userType = 'TR';
         this.loginService.loginAuthentication(this.user).subscribe(
             user => {
                 if (user)
                 {
                    this.router.navigateByUrl('/home');
                 }
             },
             err => {
                       // Log errors if any
                              console.log(err);
             });

     }
     else if (this.truflAdmin == 'TA') {
         this.userType = 'TA';
         //console.log(this.user);
         this.loginService.loginAuthentication(this.user).subscribe(
             user => {
                 if (user) {
                     this.router.navigateByUrl('/dashboard');
                 }
             },
             err => {
                 // Log errors if any
                 console.log(err);
             });

     }
     this.loginService.setUserType(this.userType); 
     this.loginService.getLoginDetails(this.userType).subscribe((data: any) => {
         data._Data.map((item: any) => {
             this.logininfo = item;
         });

     }
     );
 }

   
}