
import { Component, ViewEncapsulation, ViewContainerRef, ViewChild } from '@angular/core';
import { HostessService } from './hostess.service';
import { HostessSettingsService } from '../HostessSettings/settings.service';
import { BioEvent } from '../HostessSettings/bioEvent';
import { PaginationControlsComponent } from 'ngx-pagination';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../shared/login.service';
import { Router } from "@angular/router";

@Component({
    selector: 'hostess',
    templateUrl: './hostess.component.html',
    styleUrls: ['./hostess.component.css'],
    providers: [ToastsManager, ToastOptions]
})
export class HostessComponent {
    private username;
    private pic;


    private restaurantName;
    private truflUserList;
    private selectedRow: Number;
    private priceOfTable;
    private classForAccept;
    private sizeOfTable;
    private accepted;
    private classForSeated;
    private RestaurantId;
    private count = 0;
    private tableData;
    private restaurantTableData;
    private dataOfTable;
    private selectedTableNumber;
    private multipleTables;
    private showProfile: boolean = false;
    private profileData: any = [];
    private tablesSelected: any = [];
    showSeatedButton: boolean = false;
    hideSeatedButton: boolean = false;
    showTurnSeats: boolean = false;
    showSeated: boolean = true;
    ActiveSeats: boolean = false;
    public currentSelectedUser: string;
    private bioinfo;

    //Parameters to pass in Api
    private usertype: any;
    private truflid: any;
    private settingsData;
    private bioData: any = [];
    private restaurantid: any;
    //add Bio
    private bioCategories: any = [];
    private bioEvents: any = [];
    private categoryId = 1;
    private eventId = 1;
    private showEvents: boolean = false;
    private description;
    private loginDetails;
    private bio = new BioEvent();
    @ViewChild('bioModal') bioModal;

    //Array for Table size
    TableSize = [
        { 'size': 2 },
        { 'size': 4 },
        { 'size': 6 },
        { 'size': 8 },
        { 'size': 10 },
        { 'size': 12 },
        { 'size': 14 },
        { 'size': 16 },
        { 'size': 18 },
        { 'size': 20 },
    ];

    constructor(private hostessService: HostessService, private settingsService: HostessSettingsService, private loginService: LoginService, private _toastr: ToastsManager, vRef: ViewContainerRef, private router: Router) {
        this._toastr.setRootViewContainerRef(vRef);
        this.classForAccept = "selected";
        this.classForSeated = "";
        this.restaurantName = this.loginService.getRestaurantName();
       
        


        console.log(this.usertype, "  this.usertype");
        console.log(this.truflid, " this.truflid");
        console.log(this.restaurantid, " this.restaurantid");
        //Displaying trufl user's list
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res._Data;
           
            console.log(this.truflUserList, " this.truflUserList");
            
        });
        
    }

    //Functinality for trufl user's list
    watlistUserDetails(data, index) {
       
        this.selectedRow = index;
        var _that = this;
        this.currentSelectedUser = data.Email;
        this.RestaurantId = data.RestaurantID;
        this.username = data.UserName;
        this.pic = data.pic;
        this.showTurnSeats = true;
        this.showSeated = false;
        this.ActiveSeats = false;
        this.usertype = data.TruflMemberType;
        this.profile(data.TruflUserID);
        this.truflid = data.TruflUserID;
        this.restaurantid = data.RestaurantID;
        this.usertype = data.TruflMemberType;
        console.log(this.truflid, " this.truflid");
        console.log(this.restaurantid, " this.restaurantid");
        this.profileData = data;
        if (this.showSeatedButton == true) {
            this.hideSeatedButton = false;
            this.showSeatedButton = false;
        }
        if (this.count == 0) {
            this.showTurnSeats = true;
            this.showSeated = true;
        } else {
            this.showSeated = true;
        }

        this.truflUserList.map(function (obj) {
            if (obj.Email != data.Email) {
                obj.isShowLinks = false;
            }
        })
        this.classForAccept = "selected";
        this.classForSeated = "";


        this.getBioinformation();
    }



    getBioinformation() {
        this.hostessService.getBioInformation(this.restaurantid, this.truflid, this.usertype).subscribe((res: any) => {
            this.bioinfo = res._Data;
            this.bioData = this.bioinfo.BioData;
            console.log(this.bioinfo.BioData, " this.bioinfo");
        });

    }



    //functionality for table size
    OnTableSizeSelection(item) {
        this.hostessService.getRestaurantTableAmount(this.RestaurantId, item.size).subscribe((res: any) => {
            this.priceOfTable = "No Price Available";
            if (res._Data[0].Amount) {
                this.priceOfTable = res._Data[0].Amount;
            }
        });
        var _that = this;
        if (this.showSeatedButton == true) {
            this.ActiveSeats = false;
        }
        else {
            this.ActiveSeats = true;
            this.sizeOfTable = item.size;
            this.hideSeatedButton = false;
            event.stopPropagation();
        }

        this.truflUserList.map(function (obj) {
            obj.isShowLinks = obj.Email == _that.currentSelectedUser;
        })

    }

    //Functionality for Accept
    accept(item) {
        this.hideSeatedButton = false;
        this.ActiveSeats = false;
        this.showSeatedButton = true;
        this.count++;
        this.accepted = 2;
        event.stopPropagation();
        this.hostessService.acceptedandremovedwaiteduser(item.RestaurantID, this.accepted).subscribe((res: any) => {

        });
        this.classForAccept = "success";
        this.classForSeated = "selected";

        window.setTimeout(() => {
            this._toastr.success("search payment has been accepted she has been notified to come to the hostess stand to get started");
        }, 200);
    }

    //Functionality for Seated
    seated(item) {
        this.dataOfTable = item;
        this.hostessService.getRestaurantTables(item.RestaurantID, 1).subscribe((res: any) => {
            this.tableData = res._Data;
        });


    }

    //Functionality for submitting reastuarnt table
    submitRestaurantTable() {
        this.restaurantTableData = { "BookingID": this.dataOfTable.BookingID, "UserID": this.dataOfTable.TruflUserID, "RestaurantID": this.dataOfTable.RestaurantID, "BStatus": 3, "TableNumbers": this.multipleTables }
        this.hostessService.updateBooking(this.restaurantTableData).subscribe((res: any) => {
            console.log(res);
        })
        window.setTimeout(() => {
            this._toastr.success("submitRestaurantTable");
        }, 200);

    }

    //Selecting table
    selectTable(item) {
        this.tablesSelected.push(item.TableNo);
        var uniq = this.tablesSelected.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        this.multipleTables = uniq.join(',');
    }

    //Functinality for closing restaurant table
    closeRestaurantTable() {
        this.classForAccept = "success";
        this.classForSeated = "selected";
        window.setTimeout(() => {
            this._toastr.success("closed restauranttabel");
        }, 200);

    }

    //Functionality for Remove
    remove(item) {
        this.accepted = 5;
        this.hostessService.acceptedandremovedwaiteduser(item.RestaurantID, this.accepted).subscribe((res: any) => {

        });
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res._Data;
        });
        window.setTimeout(() => {
            this._toastr.success("removed successfully");
        }, 200);
    }

    //Functionality for Cancel
    cancelSeats() {
        var _that = this;
        this.showTurnSeats = false;
        this.hideSeatedButton = false;
        this.ActiveSeats = false;
        this.showSeatedButton = true;
        this.truflUserList.map(function (obj) {
            obj.isShowLinks = false;
        })
        this.count++;
        this.showProfile = false;
    }
    

    //Functionality for closing side nav
    closeProile() {
        this.showProfile = false;
    }

    //print functionality
    print(profileSection: string) {
        let popupWinindow
        let innerContents = document.getElementById('profileSection').innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

    //show profile
    profile(truflUserId) {

        this.truflid = truflUserId;
        this.settingsService.getUserDetails(this.usertype, truflUserId, this.RestaurantId).subscribe((res: any) => {
            this.settingsData = res._Data;
            this.settingsData.UserProfielFullName.map((item: any) => {
                this.profileData = item;
            });
            //Bio Data
            //this.bioData = this.settingsData.BioData;

            //History Data

            this.showProfile = true;
        });

        //this.GetBioCategories();
        //this.showProfile = true;
    }

    //onCategoryChange(id) {
    //    this.categoryId = id;
    //    this.GetBioEvents(this.categoryId);
    //    this.showEvents = true;

    //}
    //onEventChange(event) {
    //    this.eventId = event;

    //}

    ////AddBio
    //addBio() {
    //    this.bio.TruflUserID = this.truflid;
    //    this.bio.RestaurantID = this.RestaurantId;
    //    this.bio.BioID = this.categoryId;
    //    this.bio.BioEventID = this.eventId;
    //    this.bio.BioDesc = this.description;

    //    console.log(this.bio);
    //    this.AddBioEvents(this.bio);
    //    this.bioModal.nativeElement.click();
    //}
    ////close ADD Bio
    //close() {
    //    this.bioModal.nativeElement.click();
    //}

    ////for Bio categories
    //GetBioCategories() {
    //    this.settingsService.GetBioCategories().subscribe((res: any) => {
    //        this.bioCategories = res._Data;

    //    }
    //    );
    //}

    ////for Bio events based on categories
    //GetBioEvents(categoryId) {
    //    this.settingsService.GetBioEvents(categoryId).subscribe((res: any) => {
    //        this.bioEvents = res._Data;

    //    }
    //    );
    //}

    ////for AddBio Event
    //AddBioEvents(bio) {
    //    this.settingsService.AddUserBioEvents(bio).subscribe((res: any) => {

    //        window.setTimeout(() => {
    //            this._toastr.success("Event Added");

    //        }, 500);
    //        window.setTimeout(() => {
    //            this.bioModal.nativeElement.click();


    //        }, 2000);
    //    }
    //    );
    //}

    //routing
    waitlistPage() {
        this.router.navigateByUrl('/waitlist');
    }
    seatedPage() {
        this.router.navigateByUrl('/seated');
    }
    snapshotPage() {
        //this.router.navigateByUrl('');
    }
    settingsPage() {
        this.router.navigateByUrl('/defaultSettings');
    }

    Addguest() {     
              
        this.router.navigateByUrl('/addGuest');
       

    }

}
