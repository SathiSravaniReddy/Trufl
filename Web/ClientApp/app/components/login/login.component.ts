﻿
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
public logininfo:any;
public restaurantAdmin;
public truflAdmin;
public userType;

constructor(private loginService:LoginService, private router:Router ){
    
}
 ngOnInit() {
      
        console.log("loadingcomponent");
        //called after the constructor and called  after the first ngOnChanges() 
      
      

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
         console.log(data, "response");
         data.map((item: any) => {
             this.logininfo = item;
             console.log(this.logininfo, "Login Info");
         });

     }
     ); 
     
       
    
        
    }


}