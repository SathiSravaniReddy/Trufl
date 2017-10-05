import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StaffService} from "./select-staff.service";

@Component({
    selector: 'selectStaff',
    templateUrl: './select-staff.component.html',
    styleUrls: ['./select-staff.style.css']

})
export class SelectStaffComponent implements OnInit {
    private staff_info: any;
    private currentRow: any;
    private isShow: boolean = false;
    constructor(private router: Router, private staffService: StaffService) {

    }

   
    ngOnInit() {
        this.getStaffDetails();

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
        console.log(staffdetails);
        
     }
}
