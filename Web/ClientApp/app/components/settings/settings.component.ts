﻿
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service'
import { LoginService } from '../shared/login.service';
@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
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
    constructor(private settingsService: SettingsService, private router: Router, private loginService: LoginService) {
        this.usertype = this.loginService.getUserType();
        console.log(this.usertype, "usertype");
        this.truflid = this.loginService.getTrufluserID();
        console.log(this.truflid, "truflid");
        this.retarauntid = this.loginService.getRestarauntId();
        console.log(this.retarauntid, "retarauntid");
    }

    ngOnInit() {
        let that = this;
        this.settingsService.getUserDetails(this.usertype, this.truflid, this.retarauntid).subscribe((res: any) => {
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
        this.user.map(function (obj) {
            obj.isEdit = false;
        });

      //  this.isShow = this.showCancelDone();
    }


    Reset(email) {
        alert(email);
        this.loginService.forgotpassword(email).subscribe((res: any) => {
            res._Data.map((item: any) => {
                this.emailDetails = item;
            });

        });
    }

}
