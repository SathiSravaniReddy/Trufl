import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service'
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private dashboardinfo: any = [];

    private customers: any = [];
    private today: any;
    private otherday: any;
    private date: any;
    private keys: any;
    private results: any;
    private offers: any = [];
    private offersNames: any = [];
    private customersNames: any = [];
    private notifications: any;
    private customersNamesIndex: any;
  
    // private isValid = true;
    constructor(private dashboardService: DashboardService) {
        //called first time before the ngOnInit()
    }


    // date
    private myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
    // to set initial date range value using the selDateRange attribute.
    private model: Object = {
        beginDate: { year: 2018, month: 10, day: 9 },
        endDate: { year: 2018, month: 10, day: 19 }
    };



    ngOnInit() {
        let dateformater = new Date();

        
            let date = {
                beginDate: { year: dateformater.getFullYear(), month: dateformater.getMonth() + 1, day: dateformater.getDate() },
                endDate: { year: dateformater.getFullYear(), month: dateformater.getMonth() + 1, day: dateformater.getDate() }
            }
            this.getDetails(date);
        console.log("loadingcomponent");
        //called after the constructor and called  after the first ngOnChanges() 
        


        
    }


    getDetails(date) {
        this.offers = [];
        this.customers = [];
        this.notifications = [];
        let input = {
            FromDate: date.beginDate.year + '-' + date.beginDate.month + '-' + date.beginDate.day,
            ToDate: date.endDate.year + '-' + date.endDate.month + '-' + date.endDate.day
        }
        let that = this;
        that.customersNamesIndex = 0;
        this.offersNames = [
            "Offers Raised",
            "Offers Accepted",
            "Offers Removed"
        ];
        this.customersNames = [
            "Number of Customers visited Trufl",
            "Total Number of Trufl customers",
            "Number of Trufl Restaurents"
        ];
        this.dashboardService.getDashboardDetails(input).subscribe((res: any) => {
            console.log(this.date, "this.datehjhkhkhkh");
            that.dashboardinfo = res._Data;
            that.keys = Object.keys(that.dashboardinfo);
            this.notifications = that.dashboardinfo[that.keys[that.keys.length - 1]];
            this.results = that.keys.map(function (keyName, index) {
                if (index <= that.keys.length - 1) {
                    if (that.dashboardinfo[keyName] && that.dashboardinfo[keyName][0]) {
                        return that.dashboardinfo[keyName][0];
                    } else {
                        return { count: 0, name: '' };
                    }
                }
            })

            this.results.map(function (obj, index) {
                if (index < 3) {
                    obj.value = obj[Object.keys(obj)[0]];
                    obj.name = that.offersNames[index];
                    that.offers.push(obj);
                } else if (index !== that.results.length - 1) {
                    obj.value = obj[Object.keys(obj)[0]];
                    obj.name = that.customersNames[that.customersNamesIndex];
                    that.customersNamesIndex++;
                    that.customers.push(obj);
                }
            });







        }
        );
    }


    onDateRangeChanged(event: IMyDateRangeModel) {
        console.log(event.beginDate, event.endDate);
        this.getDetails({ beginDate: event.beginDate, endDate: event.endDate });
    }

    setRange() {
        this.today = !this.otherday;
        this.date = '';
    }
    setDate() {





        let dateformater = new Date();

        
        
        if (this.today) {
            this.otherday = false;
            
            this.date = {
                beginDate: { year: dateformater.getFullYear(), month: dateformater.getMonth() + 1, day: dateformater.getDate() },
                endDate: { year: dateformater.getFullYear(), month: dateformater.getMonth() + 1, day: dateformater.getDate() }
            }
            console.log(this.date, "this.date");
            this.getDetails(this.date);
        } else {
            this.date = '';
        }

    }



}