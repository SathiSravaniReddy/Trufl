
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
    private userType;
    private user = new User();
    private errorMsg;
    private showForgotPassword = false;
    private showResetPassword = false;
    private showlogin = true;
    constructor(private loginService:LoginService, private router:Router ){
    
    }
    signIn() {
         this.loginService.setUserType(this.userType); 
         this.loginService.loginAuthentication(this.user).subscribe(
             user => {
                 if (user && (this.userType == 'TR'))
                 {
                    this.router.navigateByUrl('/home');
                 }
                 else if (user && (this.userType == 'TA')){
                     this.router.navigateByUrl('/dashboard');
                 }
                 else if (user) {
                     this.errorMsg = "Please Select User Type";
                 }
                     
                 else {
                     this.errorMsg = "Please enter valid username and password";
                 }
             },
             err => {
                       // Log errors if any
                
                              console.log(err);
             });

     
     
        this.loginService.getLoginDetails(this.userType).subscribe((data: any) => {
            data._Data.map((item: any) => {
                this.logininfo = item;
        });

     }
     );
    }
    showLogin() { 
        this.showResetPassword = false;
        this.showForgotPassword = false;
        this.showlogin = true;
    }
    forgotPassword() {
        this.showlogin = false;
        this.showResetPassword = false;
        this.showForgotPassword = true;
       
    }
    resetPassword() {
        this.showlogin = false;
        this.showForgotPassword = false;
        this.showResetPassword = true;  
    }
   
}