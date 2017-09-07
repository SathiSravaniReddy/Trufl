
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from '../login/user';


@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    private user = new User();
   constructor(private router: Router, private loginService: LoginService) {

       

    }
    signUp() {
      
        alert("Registration Successfull");
        this.router.navigateByUrl("/login");
        /*this.loginService.create(this.user)
            .subscribe(
            data => {
                   this.router.navigateByUrl("/login");
            },
            err => {
                            // Log errors if any
               console.log(err);
        });*/
      
    }

}