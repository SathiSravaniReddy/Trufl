
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { RestaurenService } from './restaurent.service';
import { Pipe, PipeTransform } from '@angular/core';
import { PaginationControlsComponent } from 'ngx-pagination';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMyDpOptions } from 'mydatepicker';
import { Router } from '@angular/router';


import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'restaurant',
    templateUrl: './resturant.component.html',
    providers: [ToastsManager, ToastOptions]
})
export class ResturantComponent implements OnInit {
    public restaurent_info: any;
    public notifications_info: any;
    public states: any;
    public notificationdatails: any;
    public details1: any;

    myForm: FormGroup;
    myFormdata: FormGroup;
    //name: FormControl;
    public data: any = {};
    public notificationdata: any = {}
    public state: any;



    @ViewChild('AddRes') addRes;
    @ViewChild('Notification') notifications;
    /*@ViewChild('EditRes') edit;*/



    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd'
    };


    constructor(private restaurenService: RestaurenService, private fb: FormBuilder, private router: Router, private _toastr: ToastsManager, vRef: ViewContainerRef) {

        this._toastr.setRootViewContainerRef(vRef);
        //called first time before the ngOnInit()


        this.myForm = fb.group({
            'RestaurantName': [null, Validators.required],
            'Email': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')])],
            'PrimaryContact': [null, Validators.required],
            'SecondaryContact': [null],
            'Address1': [null, Validators.required],
            'Address2': [null],
            'State': [null],
            'Zipcode': [null, Validators.required],
            'OwnerName': [null, Validators.required],
            'OwnerEmail': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')])],
            'OwnerContact1': [null, Validators.required],
            'OwnerContact2': [null],
            /* 'Description': [null, Validators.required],*/
            'Description': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
            /* 'QuotedTime': [null, Validators.required] */
            'QuotedTime': [null, Validators.compose([Validators.required, Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]')])]




        });



        this.myFormdata = fb.group({
            'ExpiryDate': [null, Validators.required],
            'description': [null, Validators.compose([Validators.required, Validators.minLength(10)])]
        });







    }
    ngOnInit() {

        this.getrestaurent();
        this.getnotifications();

        this.states = [
            { value: 0, name: 'Dallas' },
            { value: 1, name: 'Newyork' },
            { value: 2, name: 'Chicago' }


        ];




    }

    getstate(name) {

        this.state = name;
        console.log(this.state);
    }


    public getrestaurent() {
        this.restaurenService.getRestaurentDetails().subscribe((res: any) => {

            console.log(res);
            this.restaurent_info = res._Data;
            console.log(this.restaurent_info);
        })

    }

    public getnotifications() {

        this.restaurenService.getnotifications().subscribe((res: any) => {

            this.notifications_info = res._Data;
            console.log(this.notifications_info);
        })

    }

    onSubmit(details: any) {

        console.log(details);

        var detailsdata = {
            "RestaurantID": null,
            "RestaurantName": details['RestaurantName'],
            "Description": details['Description'],
            "PrimaryContact": details['PrimaryContact'],
            "SecondaryContact": details['SecondaryContact'],
            "HoursofOperation": null,
            "Parking": null,
            "Geo": null,
            "Email": details['Email'],
            "Address1": details['Address1'],
            "Address2": details['Address2'],
            "State": this.state,
            "Zipcode": details['Zipcode'],
            "OwnerName": details['OwnerName'],
            "OwnerContact1": details['OwnerContact1'],
            "OwnerContact2": details['OwnerContact2'],
            "OwnerEmail": details['OwnerEmail'],
            "GetSeatedOffer": null,
            /*  "CurrentWaitTime":1,*/
            "QuotedTime": details['QuotedTime'],
            "ModifiedDate": "2017-09-17T22:27:38.3279471-07:00",
            "ModifiedBy": 1,
            "SeatingSize": 2,
            "NumberOfTables": 2,
            "MenuPath": 2,
            "LoggedInUser": 1
        }



        var editdetails = {
            "RestaurantID": this.data.RestaurantID,
            "RestaurantName": details['RestaurantName'],
            "Description": details['Description'],
            "PrimaryContact": details['PrimaryContact'],
            "SecondaryContact": details['SecondaryContact'],
            "HoursofOperation": null,
            "Parking": null,
            "Geo": null,
            "Email": details['Email'],
            "Address1": details['Address1'],
            "Address2": details['Address2'],
            "State": this.state,
            "Zipcode": details['Zipcode'],
            "OwnerName": details['OwnerName'],
            "OwnerContact1": details['OwnerContact1'],
            "OwnerContact2": details['OwnerContact2'],
            "OwnerEmail": details['OwnerEmail'],
            "GetSeatedOffer": null,
            /*  "CurrentWaitTime":1,*/
            "QuotedTime": details['QuotedTime'],
            "ModifiedDate": "2017-09-17T22:27:38.3279471-07:00",
            "ModifiedBy": 1,
            "SeatingSize": 2,
            "NumberOfTables": 2,
            "MenuPath": 2,
            "LoggedInUser": 1
        }






        if (editdetails.RestaurantID) {
            console.log("coming");

            this.restaurenService.addRestaurentDetails(editdetails).subscribe((res: any) => {
                this.myForm.reset();
                this.addRes.nativeElement.click();
                this.getrestaurent();



                if (res['_StatusMessage'] == "Success") {

                    window.setTimeout(() => {
                        this._toastr.success("data saved successfully");
                    }, 20);

                }
                else {
                    alert("Error");
                }



            })


        }
        else {
            this.restaurenService.addRestaurentDetails(detailsdata).subscribe((res: any) => {

                if (res['_StatusMessage'] == "Success") {

                    window.setTimeout(() => {
                        this._toastr.success("data saved successfully");
                    }, 20);

                }
                else {
                    alert("Error");
                }


                this.myForm.reset();
                this.addRes.nativeElement.click();
                this.getrestaurent();






            })

        }


    }


    cancel() {
        // console.log("coming");

        this.myForm.reset();
        /* this.addRes.nativeElement.click();*/

    }




    editDetails(restaurentinfo, $event) {
        event.preventDefault();
        this.data = restaurentinfo;
    }



    onSubmitNotification(details: any) {
        details.ExpiryDate = details.ExpiryDate.formatted;

        this.restaurenService.onSubmitNotifications(details).subscribe((res: any) => {


            this.myFormdata.reset();
            this.notifications.nativeElement.click();
            this.getnotifications();

            if (res['_StatusMessage'] == "Success") {

                window.setTimeout(() => {
                    this._toastr.success("data saved successfully");
                }, 20);

            }
            else {
                alert("Error");
            }

        })

    }



    Cancel() {

        //  this.notificationdata = '';
        this.myFormdata.reset();
        /*  this.myFormdata.reset();
          this.notifications.nativeElement.click();  */
    }




}
@Pipe({
    name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {


    public transform(value, key: string, term: string) {

        if (value == null) {
            return null;
        }

        return value.filter((item) => {
            if (item.hasOwnProperty(key)) {
                if (term) {
                    let regExp = new RegExp('\\b' + term, 'gi');
                    return regExp.test(item[key]);
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    }


}



