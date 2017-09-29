
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service'
import { LoginService } from '../shared/login.service';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProfileUser } from '../HostessSettings/profileUser';
import { PaginationControlsComponent } from 'ngx-pagination';
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
    private profileUser = new ProfileUser();
    //private loginDetails;
    private emailDetails: any;
    constructor(private settingsService: SettingsService, private router: Router, private loginService: LoginService, private _toastr: ToastsManager, vRef: ViewContainerRef) {
        this._toastr.setRootViewContainerRef(vRef);
        this.usertype = this.loginService.getUserType();
        this.truflid = this.loginService.getTrufluserID();
        console.log(this.truflid);
        this.retarauntid = this.loginService.getRestaurantId();
        //this.loginDetails = this.loginService.getUser();
       
    }

    ngOnInit() {
        
        this.getuserDetails();


    }

    getuserDetails() {
        let that = this;
        this.settingsService.getUserDetails(this.usertype, this.retarauntid, this.truflid).subscribe((res: any) => {
            console.log(this.usertype, this.retarauntid, this.truflid,"this.usertype, this.retarauntid, this.truflid");
            this.user_Profile = res._Data;

            this.UserInformation = this.user_Profile.UsersInformation[0];
            this.user = [];
            Object.keys(this.UserInformation).map(function (keyName, index) {
                that.user.push({
                    isEdit: false,
                    value: that.UserInformation[keyName],
                    key: keyName,

                })
            });


            this.UsersInformation = this.user_Profile.RegisteredRestaurants;


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
       
        this.user.map(function (obj) {
            obj.isEdit = false;
        });
   
        this.profileUser.UserID = this.truflid;
        this.profileUser.UserName = this.user[0].value;
        this.profileUser.UserEmail = this.user[1].value;
        this.profileUser.NewLoginPassword = this.user[2].value;
        //if (this.UserInformation.Password === this.user[2].value) {
        //    this.profileUser.NewLoginPassword = this.loginDetails.password;
        //}
        //else {
        //    this.profileUser.NewLoginPassword = this.user[2].value;
        //}
        this.settingsService.PostProfileEdit(this.profileUser).subscribe((res: any) => {
            window.setTimeout(() => {
                this._toastr.success("Changes Saved");

            }, 500);
        }
        );

        this.getuserDetails();

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
