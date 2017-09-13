
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from '../login/user';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    private user = new User();
    constructor(private router: Router, private loginService: LoginService, /*public toastr: ToastsManager*/) {

       

    }
    //SignUp method
    signUp() {
        console.log(this.user);
       alert("Registration Successfull");
        //this.toastr.success('Registration Successfull','success');
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