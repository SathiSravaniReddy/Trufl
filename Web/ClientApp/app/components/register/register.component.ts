﻿
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from '../login/user';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    private user = new User();
   constructor(private router: Router, private loginService: LoginService) {

       

    }
    signUp() {
        console.log(this.user);
        alert("Registration Successfull");
        this.loginService.create(this.user)
            .subscribe(
            data => {
                   this.router.navigateByUrl("/login");
            },
            err => {
                            // Log errors if any
               console.log(err);
        });
      
    }

}