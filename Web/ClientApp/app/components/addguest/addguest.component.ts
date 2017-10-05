import { Component } from '@angular/core';

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






    onSubmit(guestdetails: any) {


        this.guestservice.addGuestDetails(guestdetails).subscribe((res: any) => {

            console.log(res)


        })

        this.data = '';

    }

    editguest(guestrecord: any) {
        this.sharedService.guestDetails = guestrecord;
        this.router.navigate(['editguest']);

    }





}
