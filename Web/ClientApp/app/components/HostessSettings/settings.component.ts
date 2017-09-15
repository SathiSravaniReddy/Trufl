
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { HostessSettingsService } from './settings.service';
import { BioEvent } from './bioEvent';
import { LoginService } from '../shared/login.service';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [ToastsManager, ToastOptions]
})
export class HostessSettingsComponent implements OnInit {
    private settingsData;
    private UserInfo: any;
    private user: any;
    private truflCustomers: any;
    private showProfile: boolean = false;
    private showbio: boolean = true;
    private profileData: any = [];
    private bioData: any = [];
    private historyData;
    private showhistory: boolean = false;
    private email: boolean = true;
    private isShow: boolean;
    //Parameters to pass in Api
    private usertype: any;
    private truflid: any;
    private restaurantid: any;
    //add Bio
    private bioCategories: any = [];
    private bioEvents: any = [];
    private categoryId;
    private eventId;
    private showEvents: boolean = false;
    private description;
    private bio = new BioEvent();
    @ViewChild('bioModal') bioModal;
    
    constructor(private settingsService: HostessSettingsService, private loginService: LoginService, private _toastr: ToastsManager, vRef: ViewContainerRef) {
        this.usertype = this.loginService.getUserType();
        this.truflid = this.loginService.getTrufluserID();
        this.restaurantid = this.loginService.getRestarauntId();
    }

    ngOnInit() {
        this.GetSettingsDetails();
        this.GetBioCategories();
    }

    GetSettingsDetails() {
        let that = this;
        this.settingsService.getUserDetails(this.usertype, this.truflid, this.restaurantid).subscribe((res: any) => {
            this.settingsData = res._Data;
            //Profile credentials
            //this.settingsData.UserLoginInformation.map((item: any) => {
            //   this.userProfile = item;

            //});
            this.UserInfo = this.settingsData.UserLoginInformation[0];
            this.user = [];
            Object.keys(this.UserInfo).map(function (keyName, index) {
                that.user.push({
                    isEdit: false,
                    value: that.UserInfo[keyName],
                    key: keyName
                })
            });
            //TruflCustomers Data
            this.truflCustomers = this.settingsData.RestaurantUserDetailswithHistory;
            //User Profile Data 
            this.settingsData.UserProfielFullName.map((item: any) => {
               this.profileData = item;
            });
            //Bio Data
            this.bioData = this.settingsData.BioData;
            //History Data
            this.historyData = this.settingsData.BookingHistory;

       });
    }

    

    //for Bio categories
    GetBioCategories() {
        this.settingsService.GetBioCategories().subscribe((res: any) => {
            this.bioCategories = res._Data;

        }
        );
    }

    //for Bio events based on categories
    GetBioEvents(categoryId) {
        this.settingsService.GetBioEvents(categoryId).subscribe((res: any) => {
            this.bioEvents = res._Data;

        }
        );
    }

    //for AddBio Event
    AddBioEvents(bio) {
        this.settingsService.AddUserBioEvents(bio).subscribe((res: any) => {
            window.setTimeout(() => {
                this._toastr.success("Bio Event Added");

            }, 500);

        }
        );
    }

    profile() {
        this.showProfile = true;
    }
    closeProile() {
        this.showProfile = false;
    }

    //edit profile
    editDetails(obj, index) {
        obj.isEdit = !obj.isEdit;

        this.isShow = this.showCancelDone();
    }
    showCancelDone() {

        return this.user.filter(function (obj) {
            return obj.isEdit;
        }).length;
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
        Object.keys(this.UserInfo).map(function (keyName, index) {
            that.user.push({
                isEdit: false,
                value: that.UserInfo[keyName],
                key: keyName
            })
        });

    }

    //Bio
    showBio() {
        this.showbio = true;
        this.showhistory = false;
    }
    showHistory() {
        this.showbio = false;
        this.showhistory = true;
    }

    //print functionality
    print(profileSection: string) {
        let popupWinindow
        let innerContents = document.getElementById('profileSection').innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

    onCategoryChange(id) {
        this.categoryId = id.target.value;
        this.GetBioEvents(this.categoryId);
        this.showEvents= true;
       
    }
    onEventChange(event) {
        this.eventId = event.target.value;

    }

    //AddBio
    addBio() {
        this.bio.TruflUserID = this.truflid;
        this.bio.RestaurantID = this.restaurantid;
        this.bio.BioID = this.categoryId;
        this.bio.BioEventID = this.eventId;
        this.bio.BioDesc = this.description;
        
        console.log(this.bio);
        this.AddBioEvents(this.bio);
        this.bioModal.nativeElement.click();

    }
    close() {
        this.bioModal.nativeElement.click();
    }
}