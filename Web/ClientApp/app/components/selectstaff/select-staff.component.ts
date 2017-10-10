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
    private firstname: any;
    private lastname: any;
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

    constructor(private router: Router, private staffService: StaffService,private sharedService:SharedService) {

    }

   
    ngOnInit() {
       
            this.staffService.getFloorNames().subscribe((res: any) => {
                this.array = res._Data;
                console.log(this.array);


                this.selectstaff = this.sharedService.arraydata;
                for (var i = 0; i < this.array.length; i++) {
                    for (var j = 0; j < this.selectstaff.length; j++) {
                        if (this.array[i].FloorName == this.selectstaff[j].FloorName) {
                            this.array[i].isDisabled = true;
                            break;
                        }
                        else {
                            this.array[i].isDisabled = false;
                        }
                    }
                }



            })      

           this.getStaffDetails();     
       
         


    

    }




    valueChange($event) {       
        this.Floor_Number = $event.target.value;
        console.log(this.Floor_Number);


        var details = {
            "RestaurantID": 1,
            "TruflUserID": 2,
            "RestaurantFloorNumber": this.Floor_Number

        }

        this.final_array.push(details);

        console.log(this.final_array);



    }


    public getStaffDetails() {
      
        this.staffService.getStaffDetails().subscribe((res: any) => {
            this.staff_info = res._Data;
            console.log(this.staff_info);

        }) 


    }

   

    back() {
        this.sharedService.arraydata = [];
        this.router.navigateByUrl('/selectselections');
    }
    next() {

        console.log(this.getstaff_info);      


        this.staffService.postStaffDetails(this.final_array).subscribe((res: any) => {
            console.log(res);

        })

       

        this.router.navigateByUrl('/reviewSelections');
    }


    showProfile(staffdetails: any) {

        this.getstaff_info = staffdetails;

        this.isShow = true;
        this.firstname = staffdetails.firstname;
        this.lastname =staffdetails.lastname;
        this.staffimage = staffdetails.img;
       /* this.RestaurantFloorNumber = staffdetails.RestaurantFloorNumber */       
        
    }

    closeProile() {

        this.isShow = false;

    }

}
