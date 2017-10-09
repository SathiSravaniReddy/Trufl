import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SharedService } from '../shared/Shared.Service';
import { SelectService } from './select-sections.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'selectSelections',
    templateUrl: './select-selections.component.html',

})
export class SelectSelectionsComponent implements OnInit {
    private selectedSection: Number;
    private array: any[] = [];
    public selections: any;
   
    public records: any;
    public FloorImage: any;
    public data: any[] = [];
    public detailsofselections: any;
    public finalarray: any[]=[];
    public totalData: any[];

    constructor(private router: Router, private sharedService: SharedService, private selectService: SelectService, private _sanitizer: DomSanitizer) {

    }
    ngOnInit() {
        this.getDetails();
    }



    public getDetails() {

        this.selectService.getDetails().subscribe((res: any) => {
           
            this.selections = res._Data;
            console.log(this.selections);
            
            for (var i = 0; i < this.selections.length; i++) {
                this.FloorImage = 'data:image/jpeg;base64,'
                this.records = this.FloorImage.concat(this.selections[i].FloorImage);
                this.selections[i].FloorImage = this.records;
                this.data.push(this.selections[i]);
                
            }

          
            console.log(this.data); 



        })


    }

    
    public back() {
        this.router.navigateByUrl('/startservice');
    }
    public next() {
        this.router.navigateByUrl('/selectStaff');

        this.selectService.updateselection(this.totalData).subscribe((res: any) => {
            console.log(res);

        })



        
    }
    public select(section, index) {
        var details = {
            "RestaurantID":section['RestaurantID'],
            "FloorNumber": section['FloorNumber'],
            "IsActive":false,
            "IsDelete":true
        }
        if (this.array.length) {
            let index = this.array.findIndex(function(item) {
                return item.FloorNumber === section.FloorNumber;
            })
            if (index >= 0) {
                this.array[index]=details
            }
            else {
                this.array.push(details);
            }
        }
        else {

             this.array.push(details)
        }


      /*  let x = this.selections.map((item, i) => {
            if (i == index) {
                return { "IsActive": false, "RestaurantID": item.RestaurantID, "FloorNumber": item.FloorNumber };
            }
            else {
                return { "IsActive": true, "RestaurantID": item.RestaurantID, "FloorNumber": item.FloorNumber }
            }
        })*/
        

        //console.log(x)






       /* let indexes = this.array.findIndex(function (item) {
            return item.FloorNumber === this.selections.FloorNumber;
        }) */
       



      /*  let indexes = this.array.findIndex(function (item) {
            return item.FloorNumber === this.selections.FloorNumber;
        })
      */

       for (var i = 0; i < this.selections.length; i++) {

            for (var j = 0; j < this.array.length; j++) {

                if (this.selections[i].FloorNumber == this.array[j].FloorNumber) {
                    this.selections.splice(i, 1);
                    this.finalarray = [];

                }
            }
        } 

       
        //this.selections.map(function(selectiondata) {
        //    var detailsofselections = {
        //        "RestaurantID": selectiondata['RestaurantID'],
        //        "FloorNumber": selectiondata['FloorNumber'],
        //        "IsActive": true,
        //        "IsDelete": true
        //    }
          
        //    console.log(detailsofselections);
        //    this.finalarray.push(detailsofselections);

        //})  
       this.selections.map(item => {
           this.finalarray.push({
               "RestaurantID": item['RestaurantID'],
               "FloorNumber": item['FloorNumber'],
               "IsActive": true,
               "IsDelete": true
           })
       });


      // var totalData = []
       this.totalData = this.finalarray.concat(this.array);     

        console.log(this.finalarray);

        this.totalData.sort(function (a, b) { return a.FloorNumber - b.FloorNumber });
        console.log(this.totalData);

        
        this.sharedService.arraydata = this.array;
        console.log(this.sharedService.arraydata);
       
    }

   
}
