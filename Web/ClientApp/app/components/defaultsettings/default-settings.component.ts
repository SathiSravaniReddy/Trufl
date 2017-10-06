import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'defaultSettings',
    templateUrl: './default-settings.component.html',
   
})
export class DefaultSettingsComponent {
    constructor(private router: Router) {
      

    }
    defineSection() {
        this.router.navigateByUrl('/defineSelections');
    }
    manageServers() {
        this.router.navigateByUrl('/manageServers');
    }
    otherSettings() {
        this.router.navigateByUrl('/otherSettings');
    }


    waitlistPage() {
        this.router.navigateByUrl('/waitlist');
    }
    seatedPage() {
        this.router.navigateByUrl('/seated');
    }
    snapshotPage() {
        //this.router.navigateByUrl('');
    }
    settingsPage() {
        this.router.navigateByUrl('/defaultSettings');
    }

    Addguest() {

        this.router.navigateByUrl('/addGuest');


    }
}
