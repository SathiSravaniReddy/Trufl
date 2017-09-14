
import { Component, OnInit } from '@angular/core';
import { HostessSettingsService } from './settings.service';
import { BioEvent } from './bioEvent';
import { LoginService } from '../shared/login.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class HostessSettingsComponent implements OnInit {
    private settingsData;
    private userProfile: any;
    private truflCustomers: any;
    private showProfile: boolean = false;
    private showbio: boolean = true;
    private profileData: any = [];
    private bioData: any = [];
    private historyData;
    private showhistory: boolean = false;
    private email: boolean = true;
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
    
    constructor(private settingsService: HostessSettingsService, private loginService: LoginService) {
        this.usertype = this.loginService.getUserType();
        this.truflid = this.loginService.getTrufluserID();
        this.restaurantid = this.loginService.getRestarauntId();
    }

    ngOnInit() {
        this.GetSettingsDetails();
        this.GetBioCategories();
    }

    GetSettingsDetails() {
        this.settingsService.getUserDetails(this.usertype, this.truflid, this.restaurantid).subscribe((res: any) => {
            this.settingsData = res._Data;
            //Profile credentials
            this.settingsData.UserLoginInformation.map((item: any) => {
               this.userProfile = item;

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
            alert("success");

        }
        );
    }

    profile() {
        this.showProfile = true;
    }
    closeProile() {
        this.showProfile = false;
    }

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

    }
}