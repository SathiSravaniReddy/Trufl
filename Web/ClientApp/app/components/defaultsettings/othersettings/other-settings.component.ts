import { Component } from '@angular/core';
import { OtherSettingsService } from '../othersettings/other-settings.service';
import { Router } from '@angular/router';
@Component({
    selector: 'otherSettings',
    templateUrl: './other-settings.component.html',
   
})
export class OtherSettingsComponent {
    private othersettingsdetails;
    constructor(private _otherservice: OtherSettingsService,private router: Router) {

        this.getOtherSelections();
    }
    getOtherSelections() {

        this._otherservice.getOtherSettingsDetails().subscribe((res: any) => {
            this.othersettingsdetails = res._Data;
            console.log(this.othersettingsdetails.name, "this.othersettingsdetails.name");

        });
    }
    cancel() {
        this.router.navigateByUrl('/defaultSettings');
    }
    savenext() {
        this.router.navigateByUrl('/defaultSettings');
    }
}
