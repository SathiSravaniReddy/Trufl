import { Component } from '@angular/core';
import { OtherSettingsService } from '../othersettings/other-settings.service';
import { Router } from '@angular/router';
@Component({
    selector: 'otherSettings',
    templateUrl: './other-settings.component.html',
   
})
export class OtherSettingsComponent {
    private othersettingsdetails;
    private othersettinginfo:any= {};
    
    constructor(private _otherservice: OtherSettingsService,private router: Router) {

       
    }
    getOtherSelections() {

        this._otherservice.postOtherSettingsDetails(this.othersettinginfo).subscribe((res: any) => {
            this.othersettingsdetails = res._Data;
           

        });
    }
    cancel() {
        this.router.navigateByUrl('/defaultSettings');
    }
    savenext() {
        
        console.log(this.othersettinginfo, "othersettinginfo");
        this.router.navigateByUrl('/defaultSettings');
    }
}
