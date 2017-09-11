
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
}