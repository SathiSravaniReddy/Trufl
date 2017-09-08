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
    constructor(private seatedService: SeatedService) {

    }

    ngOnInit() {
        this.getSeatedDetails();
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
        this.isenabled = true;
    }
    public get(data: any, type: any, event: any) {

        var details = {
            "RestaurantID": data['RestaurantID'],
            "TruflUserID": data['TruflUserID'],
            "AmenitiName": type,
            "AmenitiChecked": data[type]
        }
        this.isenabled = true;
        if (event.target.checked) {
            details.AmenitiChecked = true;

            this.items.push(details);

        }
        else {

            if (details.AmenitiChecked == 1) {
                details.AmenitiChecked = false


                this.items.push(details);
            }
            else {
                details.AmenitiChecked = false
                this.items.map((item, index) => {
                    if (item.TruflUserID == data['TruflUserID'] && item.AmenitiName == type) {
                        this.items.splice(index, 1);
                    }
                })
            }


        }


    }


    postSeatedDetails() {
        console.log(this.items);
        this.seatedService.postSeatedDetails(this.items).subscribe((res: any) => {           
            this.getSeatedDetails();
              this.items = [];
        })

    }


    public hasData(): boolean {
        return (this.seatedinfo != null && this.seatedinfo.length > 0);
    }



}


