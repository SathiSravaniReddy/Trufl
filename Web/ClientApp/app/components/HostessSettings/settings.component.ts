
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { HostessSettingsService } from './settings.service';
import { BioEvent } from './bioEvent';
import { ProfileUser } from './profileUser';
import { LoginService } from '../shared/login.service';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DatePipe } from "@angular/common";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [ToastsManager, ToastOptions, DatePipe]
})
export class HostessSettingsComponent implements OnInit {
    private settingsData;
    //Profile
    private UserInfo: any;
    private user: any=[];
    private profileUser = new ProfileUser();
    private truflCustomers: any = [];
    private showTruflCustomers: boolean = true;
    private showProfile: boolean = false;
    private showbio: boolean = true;
    private profileData: any = [];
    private bioData: any = [];
    private restaurantName;
    //private bioHistory: any=[];
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
    private categoryId = 1;
    private eventId = 1;
    private showEvents: boolean = false;
    private description;
    private loginDetails;
    private bio = new BioEvent();
    @ViewChild('bioModal') bioModal;
    
    constructor(private settingsService: HostessSettingsService, private loginService: LoginService, private _toastr: ToastsManager, vRef: ViewContainerRef, private datePipe: DatePipe) {
        this._toastr.setRootViewContainerRef(vRef);
        //called first time before the ngOnInit()
        this.usertype = this.loginService.getUserType();
        this.truflid = this.loginService.getTrufluserID();
        this.restaurantid = this.loginService.getRestaurantId();
        this.restaurantName = this.loginService.getRestaurantName();
        this.loginDetails = this.loginService.getUser();
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
            this.UserInfo = this.settingsData.UserLoginInformation[0];
            Object.keys(this.UserInfo).map((keyName, index) => {
                that.user.push({
                    isEdit: false,
                    value: that.UserInfo[keyName],
                    key: keyName
                })
            });

            //TruflCustomers Data
            if (this.settingsData.RestaurantUserDetailswithHistory.length > 0) {
                this.showTruflCustomers = true;   
                this.settingsData.RestaurantUserDetailswithHistory.map((item: any) => {
                    return this.truflCustomers.push({
                        TruflUserID: item.TruflUserID,
                        FullName: item.FullName,
                        LastVisited: item.LastVisited ? this.datePipe.transform(item.LastVisited, 'd/M/yy') : ""
                    })
                });
            }
            else {
                this.showTruflCustomers = false;
            }
           
            
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
                this._toastr.success("Event Added");

            }, 500);
            window.setTimeout(() => {
                this.bioModal.nativeElement.click();


            }, 2000); 
        }
        );
    }

    //show profile
    profile(truflUserId) {
        
        this.truflid = truflUserId;
        this.usertype = "TU";
        this.settingsService.getUserDetails(this.usertype, truflUserId, this.restaurantid).subscribe((res: any) => {
            this.settingsData = res._Data;
            this.settingsData.UserProfielFullName.map((item: any) => {
              this.profileData = item;
            });
            //Bio Data
            this.bioData = this.settingsData.BioData;

            //History Data
            this.historyData = this.settingsData.BookingHistory;
           
            this.showProfile = true;
        });

        //this.showProfile = true;
    }
    closeProile() {
        this.showProfile = false;
    }

    //edit profile
    editDetails(obj, index) {
        obj.isEdit = !obj.isEdit;

        
    }

    //edit profile done
    Done() {
        this.user.map((obj) => {
            obj.isEdit = false;
        });
        
        this.profileUser.UserID = this.truflid;
        this.profileUser.UserName = this.user[0].value;
        this.profileUser.UserEmail = this.user[1].value;
        if (this.UserInfo.Password === this.user[2].value) {
            this.profileUser.NewLoginPassword = this.loginDetails.password;
        }
        else {
            this.profileUser.NewLoginPassword = this.user[2].value;
        }
       // console.log(this.profileUser);
        this.settingsService.PostProfileEdit(this.profileUser).subscribe((res: any) => {
           window.setTimeout(() => {
                this._toastr.success("Changes Saved");

           }, 500);
        }
        );
    }
    //edit profile cancel
    cancel() {
        var that = this;
        this.user.map((obj) => {
            obj.isEdit = false;


        });
        this.user = [];
        Object.keys(this.UserInfo).map((keyName, index) => {
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
    //History
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
        this.categoryId = id;
        this.GetBioEvents(this.categoryId);
        this.showEvents= true;
       
    }
    onEventChange(event) {
        this.eventId = event;

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
    //close ADD Bio
    close() {
        this.bioModal.nativeElement.click();
    }
}