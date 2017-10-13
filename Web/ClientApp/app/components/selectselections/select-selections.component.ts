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
    private array: any[] = [];
    public selections: any;
    public records: any;
    public FloorImage: any;
    public data: any[] = [];
    public detailsofselections: any;
    public finalarray: any[] = [];
    public totalData: any[];
    public selectiondata: any;
    public imageIterate: any;   
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

            this.selectiondata.forEach((itemdata, index) => {
                if (itemdata.IsActive == false) {
                    var obj = {
                             "RestaurantID": itemdata.RestaurantID,
                             "FloorNumber": itemdata.FloorNumber,
                             "FloorName": itemdata.FloorName,
                             "image":itemdata.ClosedImage,
                             "IsActive":itemdata.IsActive                          
                      }
                     this.image_changes.push(obj);
                }
                else {
                    var obj = {
                        "RestaurantID":itemdata.RestaurantID,
                        "FloorNumber":itemdata.FloorNumber,
                        "FloorName":itemdata.FloorName,
                        "image":itemdata.FloorImage,
                        "IsActive":itemdata.IsActive
                   } 
                    this.image_changes.push(obj);
                }             
                                
            })
            this.imageIterate = 'data:image/JPEG;base64,'
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
        this.selectiondata.forEach((item, index) => {
            if (item.FloorNumber == section.FloorNumber && section.IsActive == false) {
                this.image_changes[index].IsActive = !this.image_changes[index].IsActive;
                this.image_changes[index].image = this.selectiondata[index].FloorImage;
                return;
            }

            else {
                if (item.FloorNumber == section.FloorNumber && section.IsActive == true) {
                    this.image_changes[index].IsActive = !this.image_changes[index].IsActive;
                    this.image_changes[index].image = this.selectiondata[index].ClosedImage;
                    return;
                }

            }
        })      

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
