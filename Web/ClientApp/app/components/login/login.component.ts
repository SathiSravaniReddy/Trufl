
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from './user';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private logininfo:any;
    private restaurantAdmin;
    private truflAdmin;
    private userType;
    private user = new User("", "");

constructor(private loginService:LoginService, private router:Router ){
    
}
 signIn() {
     if (this.restaurantAdmin == 'TR') {
         this.userType = 'TR';
         this.router.navigateByUrl('/home');
     }
     else if (this.truflAdmin == 'TA') {
         this.userType = 'TA';
         this.router.navigateByUrl('/dashboard');

     }
     this.loginService.setUserType(this.userType); 
     this.loginService.getLoginDetails(this.userType).subscribe((data: any) => {
         data._Data.map((item: any) => {
             this.logininfo = item;
         });

     }
     );
 }

    onSubmit() {

        this.loginService.loginAuthentication(this.user);
    }
}