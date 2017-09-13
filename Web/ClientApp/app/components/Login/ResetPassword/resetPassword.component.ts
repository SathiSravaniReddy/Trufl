
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reset } from './reset';
import { LoginService } from '../../shared/login.service';


@Component({
    selector: 'resetPassword',
    templateUrl: './resetPassword.component.html',
})
export class ResetPasswordComponent {
   
    private reset = new Reset();
    private confirmPassword:string;
    constructor(private router: Router, private loginService: LoginService) {

    }
    ngOnInit() {

    }


   
    resetPasswordImpl() {
        this.reset.UserEmail = "";
        console.log(this.reset);
        console.log(this.confirmPassword);
        this.loginService.resetPassword(this.reset).subscribe((res: any) => {
            
                
            });
        this.router.navigateByUrl('./login');
    }
     

}