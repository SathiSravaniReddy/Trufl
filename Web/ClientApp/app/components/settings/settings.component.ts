
import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service'

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit{
    private user_Profile: any;
    private trufl_customers: any;

    constructor(private settingsService: SettingsService) {

    }

    ngOnInit() {
        console.log("loadingcomponent");
        this.settingsService.getUserDetails().subscribe((res: any) => {
            this.user_Profile = res.data;
            console.log(this.user_Profile);

        }
        );

        this.getTruflCustomers();

      
    }

    getTruflCustomers() {

        this.settingsService.getTruflCustomers().subscribe((res: any) => {
            this.trufl_customers = res.data;
            console.log(this.trufl_customers);

        }
        );

    }
}