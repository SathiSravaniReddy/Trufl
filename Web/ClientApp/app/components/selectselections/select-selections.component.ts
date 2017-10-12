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
    public finalarray: any[] = [];
    public totalData: any[];

    public selectiondata: any;
    public x: any;
   
    public image_changes: any[] = [];

    constructor(private router: Router, private sharedService: SharedService, private selectService: SelectService, private _sanitizer: DomSanitizer) {

    }
    ngOnInit() {
        this.getDetails();
    }



    public getDetails() {

        this.selectService.getDetails().subscribe((res: any) => {

           
            this.selectiondata = res._Data;
                       

            this.sharedService.arraydata.push(this.selectiondata);          

            for (var i = 0; i < this.selectiondata.length; i++) {

                if (this.selectiondata[i].IsActive == false) {
                    var obj = {
                             "RestaurantID": this.selectiondata[i].RestaurantID,
                             "FloorNumber": this.selectiondata[i].FloorNumber,
                             "FloorName": this.selectiondata[i].FloorName,
                             "image": this.selectiondata[i].ClosedImage,
                             "IsActive": this.selectiondata[i].IsActive                          
                      }
                    this.image_changes.push(obj);
                   

                }
                else {
                    var obj = {
                        "RestaurantID": this.selectiondata[i].RestaurantID,
                        "FloorNumber": this.selectiondata[i].FloorNumber,
                        "FloorName": this.selectiondata[i].FloorName,
                        "image": this.selectiondata[i].FloorImage,
                        "IsActive": this.selectiondata[i].IsActive
                    } 
                    this.image_changes.push(obj);
                   

                }

            } 


            this.x = 'data:image/JPEG;base64,'

            this.selections = Object.assign({}, this.selectiondata);
             


        })


    }


 

    public back() {
       
        this.router.navigateByUrl('/startservice');
    }
    public next() {
        this.router.navigateByUrl('/selectStaff');

        this.selectService.updateselection(this.array).subscribe((res: any) => {           

        })

    }








    public select(section, index) {

       

        for (var i = 0; i < this.selectiondata.length; i++) {

            if (this.selectiondata[i].FloorNumber==section.FloorNumber && section.IsActive == false) {               
                this.image_changes[i].IsActive = !this.image_changes[i].IsActive;
                this.image_changes[i].image = this.selectiondata[i].FloorImage;
                break;
            }
            else {
                if (this.selectiondata[i].FloorNumber == section.FloorNumber && section.IsActive == true) {                    
                    this.image_changes[i].IsActive = !this.image_changes[i].IsActive;
                    this.image_changes[i].image = this.selectiondata[i].ClosedImage;                    
                    break;
                }
                
            }

        }

       

        var details = {
            "RestaurantID": section['RestaurantID'],
            "FloorNumber": section['FloorNumber'],
            "IsActive": section['IsActive'],
            "IsDelete": true
        }


        if (this.array.length) {
            let index = this.array.findIndex(function (item) {
                return item.FloorNumber === section.FloorNumber;
            })
            if (index >= 0) {
                this.array[index] = details
            }
            else {
                this.array.push(details);
            }
        }
        else {

            this.array.push(details)
        }
               

    }

   

}
