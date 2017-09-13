
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'resetPassword',
    templateUrl: './resetPassword.component.html',
})
export class ResetPasswordComponent {
    private mailPassword:string="";
    private newPassword:string="";
   // private passwords: {};
    constructor(private router: Router) {

    }
    ngOnInit() {

    }


   
    resetPasswordImpl() {
        console.log(this.mailPassword);
        console.log(this.newPassword);
        this.router.navigateByUrl('./login');
    }

}