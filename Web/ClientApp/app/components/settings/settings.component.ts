
import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service'
import { LoginService } from '../shared/login.service';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [ToastsManager, ToastOptions]
})
export class SettingsComponent implements OnInit {
    private user_Profile: any;
    private trufl_customers: any;
    private UserInformation: any;
    private UsersInformation: any;
    private user: any;
    private isShow: boolean;
    private userid: any;
    private restaruantid: any;
    private usertype: any;
    private truflid: any;
    private retarauntid: any;
    //private email: any;
    private emailDetails: any;
    constructor(private settingsService: SettingsService, private router: Router, private loginService: LoginService, private _toastr: ToastsManager, vRef: ViewContainerRef) {
        this._toastr.setRootViewContainerRef(vRef);
        this.usertype = this.loginService.getUserType();
        console.log(this.usertype, "usertype");
        this.truflid = this.loginService.getTrufluserID();
        console.log(this.truflid, "truflid");
        this.retarauntid = this.loginService.getRestaurantId();
        console.log(this.retarauntid, "retarauntid");
    }

    ngOnInit() {
        let that = this;
        this.settingsService.getUserDetails(this.usertype, this.retarauntid,this.truflid).subscribe((res: any) => {
            this.user_Profile = res._Data;
            console.log(this.user_Profile, " this.user_Profile");
            this.UserInformation = this.user_Profile.UsersInformation[0];
            this.user = [];
            Object.keys(this.UserInformation).map(function (keyName, index) {
                that.user.push({
                    isEdit: false,
                    value: that.UserInformation[keyName],
                    key: keyName
                })
            });

            console.log(this.UserInformation, "this.UserInformation");
            this.UsersInformation = this.user_Profile.RegisteredRestaurants;
            console.log(this.UsersInformation, "this.UsersInformation");

        }
        );

       

    }

    

    showCancelDone() {

        return this.user.filter(function (obj) {
            return obj.isEdit;
        }).length;
    }

    editDetails(obj, index) {
        obj.isEdit = !obj.isEdit;

        this.isShow = this.showCancelDone();
    }


    Done() {
        console.log(this.user);
        this.user.map(function (obj) {
            obj.isEdit = false;
        });

        this.isShow = this.showCancelDone();
    }
    cancel() {
        var that = this;
      this.user.map(function (obj) {
          obj.isEdit = false;
        
            
        });

  this.isShow = this.showCancelDone();
      this.user = [];
      Object.keys(this.UserInformation).map(function (keyName, index) {
          that.user.push({
              isEdit: false,
              value: that.UserInformation[keyName],
              key: keyName
          })
      });
     
    }


    Reset(email) {
        
        this.loginService.forgotpassword(email).subscribe((res: any) => {
            res._Data.map((item: any) => {
                this.emailDetails = item;
                
            });
            window.setTimeout(() => {
                this._toastr.success("email sent");
            }, 200);
        });
    }

}
