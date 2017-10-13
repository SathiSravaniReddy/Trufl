import { Component, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared/Shared.Service';
import { EditGuestService } from './editguest.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app_edit',
    templateUrl: './editguest.component.html',

})
export class EditGuestComponent {


    public data: any = {};
    public message: any;
    public number: any;

    constructor(private sharedService: SharedService, public editGuestService: EditGuestService, private router: Router) {

        //  this.message = this.messageService.getMessage().subscribe(message => {
        //  this.data = message;
        //  console.log(this.data);
        //  this.data = '';

        //});
        this.data = this.sharedService.guestDetails;



    }



    ngOnInit() {


    }

    onSubmit(guestdetails: any,form: NgForm) {

        this.editGuestService.editGuestDetails(guestdetails, this.number).subscribe((res: any) => {

            console.log(res);
        })

        form.resetForm();


    }


    get(number: any) {
        this.number = number;
        console.log(this.number);
    }

    EditCancel() {

        this.router.navigate(['waitlist']);
    }


}