
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    private person: any = {};
    constructor(private router: Router) {
       

    }
    signUp() {
      
        alert("Succesfully Registered");
        this.router.navigateByUrl("/login");
       /* this.userService.create(this.person)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });*/
    }

}