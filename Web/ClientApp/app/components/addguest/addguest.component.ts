
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GuestService } from './addguest.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/Shared.Service';



@Component({
    selector: 'addGuest',
    templateUrl: './addguest.component.html',

})
export class AddGuestComponent {


    public data: any = {};
    public guest_info: any;
    public record: any;
    public number: any;



    constructor(private guestservice: GuestService, private router: Router, private sharedService: SharedService) {

    }
    ngOnInit() {
        this.getguestsdetails();

    }

    public getguestsdetails() {
        this.guestservice.getguestsdetails().subscribe((res: any) => {
            this.guest_info = res.data;

        })

    }



    addtowaitlist(guestdetails: any) {
        console.log(guestdetails);


    }



    onSubmit(guestdetails: any, form: NgForm) {
        this.guestservice.addGuestDetails(guestdetails,this.number).subscribe((res: any) => {
            console.log(res);
        })
        form.resetForm();
      

    }
    get(number:any) {
        this.number = number;
        console.log(this.number);
    }

    editguest(guestrecord: any) {
        this.sharedService.guestDetails = guestrecord;
        this.router.navigate(['editguest']);

    }

     cancel() {
         this.router.navigate(['waitlist']);        
      }




}
