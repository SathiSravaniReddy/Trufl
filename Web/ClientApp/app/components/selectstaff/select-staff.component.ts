import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StaffService } from "./select-staff.service";
import { SharedService } from '../shared/Shared.Service';

@Component({
    selector: 'selectStaff',
    templateUrl: './select-staff.component.html',
    styleUrls: ['./select-staff.style.css']

})
export class SelectStaffComponent implements OnInit {
    private staff_info: any;
    private FullName: any;
   
    private isShow: boolean = false;
    private staffimage: any;
    public array: any[] = [];
    public selectstaff: any[] = [];
    public status: boolean=false;
    public serversstaff: any;
    public getstaff_info: any;
    public isDisabled;
    public Floor_Number: any; 
    public final_array: any[] = [];

    public FloorNumber: any;
    public selectdFloorName: any;

    constructor(private router: Router, private staffService: StaffService,private sharedService:SharedService) {

    }

   
    ngOnInit() {
        

           this.getStaffDetails();     
       
           this.getInActiveFloors(); 


    

    }


    public getInActiveFloors() {


        this.staffService.getFloorNames().subscribe((res: any) => {
            this.array = res._Data;         

            this.selectstaff = this.sharedService.arraydata;     
            

        }) 
        

    }







    valueChange($event) {       
        this.Floor_Number = $event.target.value;
      


        var details = {
            "RestaurantID": this.getstaff_info.RestaurantID,
            "TruflUserID": this.getstaff_info.TruflUserID,
            "RestaurantFloorNumber": JSON.parse(this.Floor_Number)

        }



        if (this.final_array.length) {
            let index = this.final_array.findIndex(function (item) {
                return item.TruflUserID === details['TruflUserID']
            })

            if (index >= 0) {
                this.final_array[index] = details;
            }
            else {
                this.final_array.push(details)
            }

        } else {
            this.final_array.push(details);
        }



     



    }


    public getStaffDetails() {
      
        this.staffService.getStaffDetails().subscribe((res: any) => {
            this.staff_info = res._Data;
          

        }) 


    }

   

    back() {
        this.sharedService.arraydata = [];
        this.router.navigateByUrl('/selectselections');
    }
    next() {

        this.staffService.postStaffDetails(this.final_array).subscribe((res: any) => {
            console.log(res);

        })

       

        this.router.navigateByUrl('/reviewSelections');
    }


    showProfile(staffdetails: any) {
        this.getstaff_info = staffdetails; 
        this.getInActiveFloors(); 
        this.isShow = true;
        this.FullName = staffdetails.FullName;      
        this.staffimage = staffdetails.pic;
        this.FloorNumber = this.getstaff_info.RestaurantFloorNumber;
       
    }

    closeProile() {

        this.isShow = false;

    }

}
