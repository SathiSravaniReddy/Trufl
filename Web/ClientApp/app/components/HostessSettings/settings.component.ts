
import { Component, OnInit } from '@angular/core';
import { HostessSettingsService } from './settings.service'

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class HostessSettingsComponent implements OnInit {
    private user_Profile: any;
    private trufl_customers: any;
    private showProfile: boolean = false;
    private showbio: boolean = true;
    private profileData: any = [];
    private showhistory: boolean = false;

    constructor(private settingsService: HostessSettingsService) {

    }

    ngOnInit() {
        this.settingsService.getUserDetails().subscribe((res: any) => {
            this.user_Profile = res.data;

        }
        );

        this.getTruflCustomers();


    }

    getTruflCustomers() {

        this.settingsService.getTruflCustomers().subscribe((res: any) => {
            this.trufl_customers = res.data;

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