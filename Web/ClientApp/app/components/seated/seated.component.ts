import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SeatedService } from './seated.service'

@Component({
    selector:'seated',
    templateUrl: './seated.component.html',
    styleUrls: ['./seated.component.css']
})
export class SeatedComponent implements OnInit {

    // private seatedinfo: any;
    seatedinfo: any = [];
    isenabled = false;
    private seatedinformation: any;
    items: Array<any> = [];
    constructor(private seatedService: SeatedService) {

    }

    ngOnInit() {
        this.seatedService.getSeatedDetails().subscribe((res: any) => {
           this.seatedinfo = res._Data;

        }
        );

    }

    public toggles = [
        { value: 0 },
        { value: 1 }
    ];

    change() {
        
        // console.log(index);
        this.isenabled = true;

        /*   for (var i = 0; i < this.items.length; i++) {
               if (event.TruflUserID == this.items[i].TruflUserID) {
                   this.items.splice(i, 1);
               }
           }
           this.items.push(event); */

    }
    get(event) {
        this.isenabled = true;
        for (var i = 0; i < this.items.length; i++) {
            if (event.TruflUserID == this.items[i].TruflUserID) {
                this.items.splice(i, 1);
            }
        }
        this.items.push(event);
        
    }


    postSeatedDetails() {
        this.seatedService.postSeatedDetails(this.items).subscribe((res: any) => {
            // this.seatedinfo = res.data;
            //  console.log(this.seatedinfo);

        })

    }


    public hasData(): boolean {
        return (this.seatedinfo != null && this.seatedinfo.length > 0);
    }



}