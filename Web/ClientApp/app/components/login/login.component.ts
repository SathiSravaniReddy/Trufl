
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from './user';
import { Reset } from './reset';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ToastsManager, ToastOptions]
})
export class LoginComponent {
    private logininfo: any;
    private user = new User();
    private errorMsg;
    private showForgotPassword = false;
    private showResetPassword = false;
    private showlogin = true;
    private email;
    private loginDetails: any;
    private emailDetails;

    public showReset: boolean=false;
    private reset = new Reset();

    constructor(private loginService: LoginService, private router: Router, private _toastr: ToastsManager, vRef: ViewContainerRef) {
        this._toastr.setRootViewContainerRef(vRef);
        //called first time before the ngOnInit()
    }
    ngOnInit() {

    }

    //login
    signIn() {
        console.log(this.user);
        this.loginService.setUserType(this.user.usertype);
        if (this.user.usertype == null) {
            window.setTimeout(() => {
                this._toastr.error("Please Select UserType");

            }, 500);
        }

        else {
            this.loginService.setUserType(this.user.usertype);
            this.loginService.loginAuthentication(this.user).subscribe((res: any) => {
                res._Data.map((item: any) => {
                    this.loginDetails = item;
                    this.loginService.setTrufluserID(this.loginDetails.TruflUSERID);
                    this.loginService.setRestaurantId(this.loginDetails.RestaurantID);
                    this.loginService.setRestaurantName(this.loginDetails.RestaurantName);
                    this.loginService.setUserName(this.loginDetails.FullName);
                });
                if (this.loginDetails) {
                    if (this.loginDetails.TruflMemberType === "RA ")
                    {
                        if (this.loginDetails.ForgetPasswordStatus) {
                            this.ResetPasswordShow();
                        }
                    
                        else if (!this.loginDetails.ForgetPasswordStatus) {
                            this.router.navigateByUrl('/hostessdashboard');
                        }
                    }
                    else if (this.loginDetails.TruflMemberType === "TA ")
                    {
                        if (this.loginDetails.ForgetPasswordStatus) {
                            this.ResetPasswordShow();
                        }

                        else if (!this.loginDetails.ForgetPasswordStatus) {
                            this.router.navigateByUrl('/dashboard');
                        }
                    }
                }
                else {
                    window.setTimeout(() => {
                        this._toastr.error("Please Enter valid username and password");

                    }, 500);
                    // this.errorMsg = "Please select usertype and enter valid username and password";
                }

            });


        }


       //this.loginService.getLoginDetails(this.loginDetails.TruflMemberType,this.loginDetails.RestaurantID).subscribe((data: any) => {
       //    data._Data.map((item: any) => {
       //       this.logininfo = item;
       //     });

       //    console.log(this.logininfo);

       // }
       // );
    }
    showLogin() {
        this.user = new User();
        this.showResetPassword = false;
        this.showForgotPassword = false;
        this.showlogin = true;
        this.showReset = false;
    }

    //Forgot Password
    forgotPasswordShow() {
        this.showlogin = false;
        this.showResetPassword = false;
        this.showForgotPassword = true;
        this.showReset = false;
    }
    forgotPasswordImpl() {
        this.showlogin = false;
        this.showForgotPassword = false;
        this.showResetPassword = true;
        this.loginService.forgotpassword(this.email).subscribe((res: any) => {
            res._Data.map((item: any) => {
                this.emailDetails = item;
            });
           
        });
   
    }

    //Reset Password
    ResetPasswordShow() {
        this.showlogin = false;
        this.showResetPassword = false;
        this.showForgotPassword = false;
        this.showReset = true;
    }
    resetPasswordImpl() {
        this.reset.UserEmail = this.loginDetails.Email;
        this.reset.UserName = this.loginDetails.FullName;
        this.reset.userId = this.loginDetails.TruflUSERID;
        console.log(this.reset);


        this.loginService.resetPassword(this.reset).subscribe((res: any) => {
            window.setTimeout(() => {
                this._toastr.success("Password changed successfully");

            }, 500);
            window.setTimeout(() => {
                this.showLogin();


            }, 1000);
        })
        
    }
    
}