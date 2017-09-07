import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SeatedService } from './seated.service'

@Component({
    selector: 'seated',
    templateUrl: './seated.component.html',
    styleUrls: ['./seated.component.css']
})
export class SeatedComponent implements OnInit {

    // private seatedinfo: any;
    seatedinfo: any = [];
    isenabled = false;
    private seatedinformation: any;
    public items: any = [];
    constructor(private seatedService: SeatedService) {

    }

    ngOnInit() {
        this.getSeatedDetails();
        /* console.log("loadingcomponent");
         this.seatedService.getSeatedDetails().subscribe((res: any) => {
            this.seatedinfo = res._Data;
            //  this.seatedinfo = "";
             console.log(this.seatedinfo);
 
         }
         ); */

    }
    getSeatedDetails() {
        this.seatedService.getSeatedDetails().subscribe((res: any) => {
            this.seatedinfo = res._Data;
            console.log(this.seatedinfo);

        }
        );

    }

    public toggles = [
        { value: 0 },
        { value: 1 }
    ];

    change() {

        console.log("coming");
        // console.log(index);
        this.isenabled = true;

        /*   for (var i = 0; i < this.items.length; i++) {
               if (event.TruflUserID == this.items[i].TruflUserID) {
                   this.items.splice(i, 1);
               }
           }
           this.items.push(event); */

    }
    public get(data: any, type: any, event: any) {

        console.log(data);
        console.log(type);
        console.log(event);

        var details = {
            "RestaurantID": data['RestaurantID'],
            "TruflUserID": data['TruflUserID'],
            "AmenitiName": type,
            "AmenitiChecked": data[type]
        }
        this.isenabled = true;
        if (event.target.checked) {
            //data[type] = true;
            details.AmenitiChecked = true;
            console.log(data);
            //if (this.items.length <= 0) {
            this.items.push(details);
            //

            //else {
            //    if (this.items.indexOf(details) == -1) {
            //        this.items.push(details);
            //    }
            //}

        }
        else {
            console.log(data);
            //data[type] = false;
            if (details.AmenitiChecked == 1) {
                details.AmenitiChecked = false
                this.items.push(details);
            }
            else {
                details.AmenitiChecked = false
                this.items.map((item, index) => {
                    if (item.TruflUserID == data['TruflUserID']) {
                        this.items.splice(index, 1);
                    }
                })
            }




        }

        //if (this.items.length <= 0) {
        //    this.items.push(details);
        //}

        //else {
        //this.items.map(item => {
        //    if (item['AmenitiName'] === type) {
        //        item['AmenitiChecked'] = data[type];


        //    }
        //    else {
        //        this.items.push(details);
        //    }
        //});

        //}




    }


    postSeatedDetails() {
        console.log(this.items);
        this.seatedService.postSeatedDetails(this.items).subscribe((res: any) => {
            console.log(res);
            this.getSeatedDetails();
        })

    }


    public hasData(): boolean {
        return (this.seatedinfo != null && this.seatedinfo.length > 0);
    }



}