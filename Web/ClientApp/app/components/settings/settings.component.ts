
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service'

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    private user_Profile: any;
    private trufl_customers: any;
    private username: boolean = false;
    private email: boolean = false;
    private password: boolean = false;;
    private selected: {};
    private userdata: any;
    private UserInformation: any;
    private UsersInformation: any;
    private user: any;
    private isShow: boolean;
    constructor(private settingsService: SettingsService, private router: Router) {

    }

    ngOnInit() {
        let that = this;
        this.settingsService.getUserDetails().subscribe((res: any) => {
            this.user_Profile = res._Data;
            console.log(this.user_Profile, " this.user_Profile");
            this.UserInformation = this.user_Profile.UserLoginInformation[0];
            this.user = [];
            Object.keys(this.UserInformation).map(function (keyName, index) {
                that.user.push({
                    isEdit: false,
                    value: that.UserInformation[keyName],
                    key: keyName
                })
            });

            console.log(this.UserInformation, "this.UserInformation");
            this.UsersInformation = this.user_Profile.usersInformation;
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

        this.isShow = this.showCancelDone();
    }


}
