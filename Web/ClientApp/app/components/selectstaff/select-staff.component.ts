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
    public selectstaff:any[]=[];
    constructor(private router: Router, private staffService: StaffService,private sharedService:SharedService) {

    }

   
    ngOnInit() {
        this.getStaffDetails();
        this.array = [{ id: 1, name: 'Main Dining' }, { id: 2, name: 'Bar Area' }, { id: 3, name: 'Mezzanine' }, { id: 4, name: 'Patio' }, { id: 5, name: 'Rooftop Bar' }]
       /* this.selectstaff = this.sharedService.arraydata;*/
        this.selectstaff.push(this.sharedService.arraydata);   

        console.log(this.selectstaff);       


       
       var index= this.array.map(function (object,index,selectstaff:any) {
            if(object.id==selectstaff.id)
            {
                return object.id;
            }

           })

       




    }

    public getStaffDetails() {
      
        this.staffService.getStaffDetails().subscribe((res: any) => {
            this.staff_info = res._Data;
            console.log(this.staff_info);

        }) 


    }

   

    back() {
        this.router.navigateByUrl('/selectselections');
    }
    next() {
        this.router.navigateByUrl('/reviewSelections');
    }


    showProfile(staffdetails: any) {
        this.isShow = true;
        this.firstname = staffdetails.firstname;
        this.lastname =staffdetails.lastname;
        this.staffimage = staffdetails.img;

        
        
    }

    closeProile() {

        this.isShow = false;

    }

}
