import { Component, ViewContainerRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { SeatedService } from './seated.service';
import { PaginationControlsComponent } from 'ngx-pagination';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OtherSettingsService } from '../defaultsettings/othersettings/other-settings.service'
@Component({
    selector: 'seated',
    templateUrl: './seated.component.html',
    styleUrls: ['./seated.component.css'],
    providers: [ToastsManager, ToastOptions]
})
export class SeatedComponent implements OnInit {

    public seatedinfo: any = [];
    public isenabled = false;
    private seatedinformation: any;
    private restaurantName: any;
    private diningtime: any;
    public items: any = [];
    load: boolean = false;   


    private arr = ['Seated', 'AppServed', 'MenuServed', 'DesertServed', 'CheckReceived', 'Boozing', 'Empty'];

    constructor(private seatedService: SeatedService, private loginService: LoginService, private _othersettings: OtherSettingsService,private router: Router, private _toastr: ToastsManager, vRef: ViewContainerRef) {

        this._toastr.setRootViewContainerRef(vRef);
        this.restaurantName = this.loginService.getRestaurantName();
        //called first time before the ngOnInit()

    }

    ngOnInit() {
        this.getSeatedDetails();
    }
    getSeatedDetails() {
        
        let that = this;
        let diningtime = this._othersettings.getDiningExperience();
        console.log(this.diningtime, " this.diningtimefjygjgjgjgj");
        this.seatedService.getSeatedDetails().subscribe((res: any) => {
            this.seatedinfo = res._Data;

            this.seatedinfo.map(function (user) {
                var currentDate = new Date();
                var currenthours = currentDate.getHours();
                let currentminutes = currentDate.getMinutes();
                let totalcurrenttime = (currenthours * 60) + currentminutes;
                console.log(currentDate, " this.currentDate");
             

                if (user.SeatedTime != null) {
                    let seatedtime = new Date(user.SeatedTime);
                    console.log(seatedtime, " this.waitedtime");
                    
                    let hours = seatedtime.getHours();
                    console.log(hours * 60, " this.hours");
                    let minutes = seatedtime.getMinutes();
                    let totalseatedtime = (hours * 60) + (minutes);
                    let totalremainingtime = totalcurrenttime-totalseatedtime;
                    console.log(totalremainingtime, "this.totalremainingtime");
                    user.totalremainingseatedtime = totalremainingtime;
                    user.remainingtime = diningtime - totalremainingtime;
                }
            })










            this.seatedinfo.map(function (obj) {
                Object.keys(obj).map(function (keyName) {
                    if (that.arr.indexOf(keyName) >= 0) {
                        obj[keyName] = (obj[keyName] == 1) ? true : false;
                    }
                })
            });          

           this.seatedinfo = this.seatedinfo.filter(function (obj) {
                return !obj['Empty']
            })

           console.log(this.seatedinfo, "this.seatedinfo");
           
        })

      

    }
   
    public toggles = [
        { value: 0 },
        { value: 1 }
    ];
   
    public get(data: any, type: any) {

        var details = {
            "RestaurantID": data['RestaurantID'],
            "TruflUserID": data['TruflUserID'],
            "AmenitiName": type,
            "AmenitiChecked": !data[type]
        }
        this.isenabled = true;

        if (this.items.length) {
            let index = this.items.findIndex(function (item) {
                return item.TruflUserID === data['TruflUserID'] && item.AmenitiName === type;
            });

            if (index >= 0) {
                this.items[index] = details;
            } else {
                this.items.push(details);
            }

        } else {
            this.items.push(details);
        }            


    }


    postSeatedDetails() {      

        
        this.load = true;

        this.seatedService.postSeatedDetails(this.items).subscribe((res: any) => {
           
            
            if (res['_StatusMessage'] =="Success") {               
                setInterval(() => {                 
                    this.load = false;                
                  
                }, 2000); 
             

                this.seatedinfo = [];
                this.getSeatedDetails();
               
            }


           
            window.setTimeout(() => {
                this._toastr.success("data saved successfully");
            }, 200);
           

        })      
      

    }


    //routing
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

    public hasData(): boolean {
        return (this.seatedinfo != null && this.seatedinfo.length > 0);
    } 



}


