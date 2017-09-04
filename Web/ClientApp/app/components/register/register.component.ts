
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    constructor(private router: Router) {
       

    }
    signUp() {
        alert("Succesfully Registered");
        this.router.navigateByUrl("/login");
    }

}