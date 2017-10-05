import { Component, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { SharedService } from '../shared/Shared.Service';
import { EditGuestService } from './editguest.service';

@Component({
    selector: 'app_edit',
    templateUrl: './editguest.component.html',

})
export class EditGuestComponent {


    public data: any = {};
    public message: any;

    constructor(private sharedService: SharedService, public editGuestService: EditGuestService) {

        //  this.message = this.messageService.getMessage().subscribe(message => {
        //  this.data = message;
        //  console.log(this.data);
        //  this.data = '';

        //});
        this.data = this.sharedService.guestDetails;



    }



    ngOnInit() {


    }

    onSubmit(guestdetails: any) {

        this.editGuestService.editGuestDetails(guestdetails).subscribe((res: any) => {

            console.log(res);
        })

        this.data = '';


    }

}