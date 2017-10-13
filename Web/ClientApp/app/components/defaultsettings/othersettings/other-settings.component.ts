import { Component,OnInit } from '@angular/core';
import { OtherSettingsService } from '../othersettings/other-settings.service';
import { Router } from '@angular/router';
@Component({
    selector: 'otherSettings',
    templateUrl: './other-settings.component.html',
   
})
export class OtherSettingsComponent implements OnInit {
    private othersettingsdetails;
    private classie: any = null;
    private otherinfo;
    private othersettinginfo: any = {     



    };
    private restarauntid:any= 1;
    private getothersettingsinfo;
    
    constructor(private _otherservice: OtherSettingsService,private router: Router) {
        this.getOtherSelectionsDetails();
       
    }
    ngOnInit() {
       
    }
    getOtherSelections() {
        this.getothersettingsinfo[0].RestaurantID = this.restarauntid;


        //this.getothersettingsinfo.push({
        //    value: this.restarauntid,
        //    key: 'RestaurantID'
        //})
        console.log(this.getothersettingsinfo, "this.getothersettingsinfohyjiyiy");
        this._otherservice.postOtherSettingsDetails(this.getothersettingsinfo[0]).subscribe((res: any) => {
            this.othersettingsdetails = res._Data;
           
           
        });
        
    }
    getOtherSelectionsDetails() {
        var that = this;
        this._otherservice.getOtherSettingsDetails().subscribe((res: any) => {
            this.getothersettingsinfo = res._Data;
            console.log(this.getothersettingsinfo, " this.getothersettingsinfo");
            //that.getothersettingsinfo.map(function (item) {
            //    this.otherinfo = item;
            //    console.log(this.otherinfo, "this.otherinfo");
            //    that._otherservice.setDiningExperience(this.otherinfo.Dining);
            //})
            this.getothersettingsinfo.map(function (item) {
                let otherinfo = item;
                console.log(otherinfo, "this.otherinfo");
                that._otherservice.setDiningExperience(otherinfo.DiningTime);
                
            })

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
