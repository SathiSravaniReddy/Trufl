import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SeatedService } from './seated.service'

@Component({
    selector: 'seated',
    templateUrl: './seated.component.html',
    styleUrls: ['./seated.component.css']
})
export class SeatedComponent implements OnInit {

    public seatedinfo: any = [];
    public isenabled = false;
    private seatedinformation: any;
    public items: any = [];
    load: boolean = false;


   // loading: boolean = false;


    private arr = ['Seated', 'AppServed', 'MenuServed', 'DesertServed', 'CheckReceived', 'Boozing', 'Empty'];

    constructor(private seatedService: SeatedService) {

    }

    ngOnInit() {
        this.getSeatedDetails();
    }
    getSeatedDetails() {
        let that = this;
        this.seatedService.getSeatedDetails().subscribe((res: any) => {
            this.seatedinfo = res._Data;

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

            console.log(this.seatedinfo);
            /*.seatedinfo.map((item, index) => {
                if (item.Empty == '1') {
                    this.seatedinfo.splice(index,1)
                }
            })*/

        })
        
        

    }

    public toggles = [
        { value: 0 },
        { value: 1 }
    ];

    change() {
        this.isenabled = true;
    }
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

        console.log(this.items);
        //if (event.target.checked) {
        //    details.AmenitiChecked = true;

        //    this.items.push(details);

        //}
        //else {

        //    if (details.AmenitiChecked == 1) {
        //        details.AmenitiChecked = false;
        //        this.items.push(details);
        //    }
        //    else {
        //        details.AmenitiChecked = false
        //        this.items.map((item, index) => {
        //            if (item.TruflUserID == data['TruflUserID'] && item.AmenitiName == type) {
        //                this.items.splice(index, 1);
        //            }
        //        })
        //    }


        //}


    }


    postSeatedDetails() {
        console.log(this.items);

        //this.loading = true;
        this.load = true;

        this.seatedService.postSeatedDetails(this.items).subscribe((res: any) => {  

            if (res['_StatusMessage'] ==
                "Success") {
             

                setInterval(() => { this.load = false; }, 3000);

            }

            this.getSeatedDetails();

          /*  this.seatedinfo.map((item, index) => {
                if (item.Empty == '1') {
                    this.seatedinfo.splice(index, 1);

                    this.getSeatedDetails();
                }
            }) */



            this.items = [];
         
           
        })

    }


    public hasData(): boolean {
        return (this.seatedinfo != null && this.seatedinfo.length > 0);
    }



}


