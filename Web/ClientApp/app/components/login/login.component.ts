
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from './user';
import { Reset } from './reset';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
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
    constructor(private loginService: LoginService, private router: Router) {
        
    }
    ngOnInit() {

    }


    signIn() {
        //console.log(this.user);
        this.loginService.setUserType(this.user.usertype);
        
        this.loginService.loginAuthentication(this.user).subscribe((res: any) => {
            res._Data.map((item: any) => {
                this.loginDetails = item;
                console.log(this.loginDetails.TruflUSERID, this.loginDetails.RestaurantID, "RestaurantID");
                this.loginService.setTrufluserID(this.loginDetails.TruflUSERID);
                this.loginService.setRestaruantId(this.loginDetails.RestaurantID);
            });
            if (this.loginDetails) {

                //if (this.loginDetails.ForgetPasswordStatus) {
                //   // this.router.navigate(['./reset']);
                //    this.ResetPasswordShow();
                //}
                //else if (!this.loginDetails.ForgetPasswordStatus) {
                //}
                    if (this.loginDetails.TruflUSERID == 11) {
                        this.router.navigateByUrl('/waitlist');
                    }
                    else if (this.loginDetails.TruflUSERID == 1) {
                        this.router.navigateByUrl('/dashboard');
                    }

               
               
            }
            else {
                this.errorMsg = "Please select usertype and enter valid username and password";
            }

        });




    //    this.loginService.getLoginDetails(this.user.usertype).subscribe((data: any) => {
    //       data._Data.map((item: any) => {
    //          this.logininfo = item;
    //        });

    //       console.log("data", "datausertype");

    //    }
    //    );
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
       
        this.loginService.resetPassword(this.reset).subscribe(
            data => {
                alert("Password change successfull");
                this.showLogin();
            },
            err => {
                // Log errors if any
                console.log(err);
            }

        );
        
    }
    
}