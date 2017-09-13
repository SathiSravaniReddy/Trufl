
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'resetPassword',
    templateUrl: './resetPassword.component.html',
})
export class ResetPasswordComponent {
    private mailPassword:string;
    private confirmPassword:string;
    constructor(private router: Router) {

    }
    ngOnInit() {

    }


   
    resetPasswordImpl() {
        

    }

}