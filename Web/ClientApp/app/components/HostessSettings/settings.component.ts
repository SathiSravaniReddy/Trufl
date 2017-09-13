
import { Component, OnInit } from '@angular/core';
import { HostessSettingsService } from './settings.service'

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class HostessSettingsComponent implements OnInit {
    private userProfile: any;
    private truflCustomers: any;
    private showProfile: boolean = false;
    private showbio: boolean = true;
    private profileData: any = [];
    private bioData: any = [];
    private historyData;
    private showhistory: boolean = false;
    private email: boolean = true;

    constructor(private settingsService: HostessSettingsService) {

    }

    ngOnInit() {
        
       this.getUserProfile();
       this.getTruflCustomers();
       this.getProfile();
       this.getBioData();
       this.getHistoryData();

    }

    getUserProfile() {

        this.settingsService.getUserDetails().subscribe((res: any) => {
            res._Data.UserLoginInformation.map((item: any) => {
                this.userProfile = item;

            });
            console.log(this.userProfile);

        }
        );

    }

    getTruflCustomers() {

        this.settingsService.getUserDetails().subscribe((res: any) => {
            this.truflCustomers = res._Data.RestaurantUserDetailswithHistory 
            console.log(this.truflCustomers);
        }
        );

    }
    getProfile() {
        this.settingsService.getUserDetails().subscribe((res: any) => {
            res._Data.UserProfielFullName.map((item: any) => {
                this.profileData = item;

            });
            console.log(this.profileData);

        }
        );
    }
    getBioData() {
        this.settingsService.getUserDetails().subscribe((res: any) => {
            this.bioData = res._Data.BioData;
            console.log(this.bioData);

        }
        );
    }
    getHistoryData() {
        this.settingsService.getUserDetails().subscribe((res: any) => {
            this.historyData = res._Data.BookingHistory;
            console.log(this.historyData);

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

    print(profileSection: string) {
        let popupWinindow
        let innerContents = document.getElementById('profileSection').innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }
}