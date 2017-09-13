
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from './user';


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
            });
            if (this.loginDetails) {

                //if (this.loginDetails.ForgetPasswordStatus) {
                //    this.router.navigate(['./reset']);
                //}
                //else if (!this.loginDetails.ForgetPasswordStatus) {
                //}
                    if (this.loginDetails.TruflUSERID == 11) {
                        this.router.navigateByUrl('/home');
                    }
                    else if (this.loginDetails.TruflUSERID == 1) {
                        this.router.navigateByUrl('/dashboard');
                    }
                
            
               
            }
            else {
                this.errorMsg = "Please select usertype and enter valid username and password";
            }

        });




        //this.loginService.getLoginDetails(this.user.usertype).subscribe((data: any) => {
        //    data._Data.map((item: any) => {
        //        this.logininfo = item;
        //    });

        //}
        //);
    }
    showLogin() {
        this.showResetPassword = false;
        this.showForgotPassword = false;
        this.showlogin = true;
    }
    forgotPasswordShow() {
        this.showlogin = false;
        this.showResetPassword = false;
        this.showForgotPassword = true;

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
   
    
}