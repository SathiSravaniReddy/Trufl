
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
    private showhistory: boolean = false;

    constructor(private settingsService: HostessSettingsService) {

    }

    ngOnInit() {
        
       this.getUserProfile();
       this.getTruflCustomers();
       

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
}