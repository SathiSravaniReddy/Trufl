﻿
import { Component, OnInit, ViewEncapsulation, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { EmployeeConfigService } from './EmployeeConfiguration.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PaginationControlsComponent } from 'ngx-pagination';


import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'employeeconfiguration',
    templateUrl: './employeeconfiguration.component.html',
    providers: [ToastsManager, ToastOptions]
})
export class EmployeeConfigurationComponent  {
    private TruflUserType = "RH";
    private employeesList;
    showOnEdit: boolean = false;
    public indexvalue: any;


    myForm: FormGroup;
    @ViewChild('AddEmp') addEmp;

    constructor(private employeeConfigService: EmployeeConfigService, private router: Router, private fb: FormBuilder,private _toastr: ToastsManager, vRef: ViewContainerRef) {

        this._toastr.setRootViewContainerRef(vRef);

        this.myForm = fb.group({
            'FullName': [null, Validators.required],
            'Email': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')])],
            'PhoneNumber': [null, Validators.required]

        });




       
    }


    ngOnInit() {
        this.getRestaurantEmployees();
    }

    getRestaurantEmployees() {
        //Displaying trufl user's list
        this.employeeConfigService.getEmployeConfiguration(this.TruflUserType, 1).subscribe((res: any) => {
            console.log(res._Data);
            this.employeesList = res._Data;
        });

    }


    editEmployeeDetails(index:any) {
        this.showOnEdit = true;
        this.indexvalue = index;

    }

    saveEditedEmployeeDetails(details: any) {
        this.showOnEdit = false;

        var detailsdata = {
            "TruflUserID": details['TruflUserID'],
            "UserName": details['FullName'],
            "Email": details['Email'],
            "PhoneNumber": details['PhoneNumber'],
            "UserType": details['TruflMemberType']         

        }
      

        this.employeeConfigService.editEmployeConfiguration(detailsdata).subscribe((res: any) => {           

            if (res['_StatusMessage'] == "Success") {

                window.setTimeout(() => {
                    this._toastr.success("data saved successfully");
                }, 20);

            }
            else {
                alert("Error");
            }
        });

        this.getRestaurantEmployees();
    }


    onSubmit(details: any) {
        console.log(details);

      /*  var newempdata = {
            "TruflUserID": null,
            "RestaurantID": null,
            "FullName": details['FullName'],
            "Email": details['Email'],
            "pic": null,
            "PhoneNumber": details['PhoneNumber'],
            "Password": null,
            "Salt": null,
            "DOB": null,
            "ActiveInd":null,
            "RestaurantEmpInd":null,
            "TruflMemberType":1,
            "TruflRelationship": null,
            "TruflshareCode": null,
            "ReferTruflUserID":null,
            "ModifiedDate": null,
            "ModifiedBy": null,
            "Waited": null,
            "LoggedInUserType":'RH'

        }*/

        var newempdata = {
            "TruflUserID": null,
            "RestaurantID": null,
            "FullName":details['FullName'],
            "Email":details['Email'],
            "pic":null,
            "PhoneNumber":details['PhoneNumber'],
            "Password":"",
            "Salt":"",
            "DOB":"",
            "ActiveInd":null,
            "RestaurantEmpInd":null,
            "TruflMemberType":null,
            "TruflRelationship":null,
            "TruflshareCode":null,
            "ReferTruflUserID":null,
            "ModifiedDate":null,
            "ModifiedBy":null,
            "Waited":null,
            "LoggedInUserType":'RH'
        }



        this.employeeConfigService.saveEmployeConfiguration(newempdata).subscribe((res: any) => {
            console.log(res);
           
        });

        this.getRestaurantEmployees();

        this.addEmp.nativeElement.click();
        this.myForm.reset();
    }
    cancel() {

        this.myForm.reset();
    }

}