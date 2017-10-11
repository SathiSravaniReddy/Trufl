import { Component } from '@angular/core';
import { OtherSettingsService } from '../othersettings/other-settings.service';
import { Router } from '@angular/router';
@Component({
    selector: 'otherSettings',
    templateUrl: './other-settings.component.html',
   
})
export class OtherSettingsComponent {
    private othersettingsdetails;
    private othersettinginfo: any = {




    };
    private getothersettingsinfo;
    
    constructor(private _otherservice: OtherSettingsService,private router: Router) {
        this.getOtherSelectionsDetails();
       
    }
    getOtherSelections() {

        this._otherservice.postOtherSettingsDetails(this.getothersettingsinfo).subscribe((res: any) => {
            this.othersettingsdetails = res._Data;
           
           
        });
        
    }
    getOtherSelectionsDetails() {

        this._otherservice.getOtherSettingsDetails().subscribe((res: any) => {
            this.getothersettingsinfo = res._Data;
            console.log(this.getothersettingsinfo, " this.getothersettingsinfo");


        });
    }

    
    cancel() {
        this.router.navigateByUrl('/defaultSettings');
    }
    savenext() {
        this.getOtherSelections();
       
        this.router.navigateByUrl('/defaultSettings');
    }
}
