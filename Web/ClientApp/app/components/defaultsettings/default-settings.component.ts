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
}
