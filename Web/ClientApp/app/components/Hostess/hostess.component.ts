
import { Component, ViewEncapsulation } from '@angular/core';
import { HostessService } from './hostess.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'hostess',
    templateUrl: './hostess.component.html',
    styleUrls: ['./hostess.component.css']
})
export class HostessComponent {

    private truflUserList;
    private priceOfTable;
    private classForAccept;
    private sizeOfTable;
    private accepted;
    private classForSeated;
    private ResturantId;
    private count = 0;
    private tableData;
    private restaurantTableData;
    private dataOfTable;
    private selectedTableNumber;
    private showProfile: boolean = false;
    private profileData: any = [];
    private tablesSelected: any = [];
    showSeatedButton: boolean = false;
    hideSeatedButton: boolean = false;
    showTurnSeats:boolean=false;
    showSeated:boolean=false;
    ActiveSeats: boolean = false;
    public currentSelectedUser: string;

    //Array for Table size
    TableSize = [
        { 'size': 2},
        { 'size': 4},
        { 'size': 6},
        { 'size': 8},
        { 'size': 10},
        { 'size': 12},
        { 'size': 14},
        { 'size': 16},
        { 'size': 18},
        { 'size': 20},
    ];

    constructor(private hostessService: HostessService) {
        this.classForAccept = "selected";
        this.classForSeated = "";

        //Displaying trufl user's list
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res._Data;
        });
    }

    //Functinality for trufl user's list
    watlistUserDetails(data) {
        var _that = this;
        this.currentSelectedUser = data.Email;
        this.ResturantId = data.RestaurantID;
        this.showTurnSeats = true;
        this.showSeated = false;
        this.ActiveSeats = false;
        this.showProfile = true;
        this.profileData = data;
        if (this.showSeatedButton == true) {
            this.hideSeatedButton = false;
            this.showSeatedButton = false;
        }
        if (this.count == 0) {
            this.showTurnSeats = true;
            this.hideSeatedButton = true;
        } else {
            this.showSeated = false;
            this.hideSeatedButton = true;
        }

        this.truflUserList.map(function (obj) {
            if (obj.Email != data.Email) {
                obj.isShowLinks = false;
            }
        })
        this.classForAccept = "selected";
        this.classForSeated = "";
    }

    //Toggling get seated now button
    trunGetSeatedNow(){
        this.showSeated = true;
        this.hideSeatedButton = false;
    }

    //functionality for table size
    OnTableSizeSelection(item) {
        this.hostessService.getRestaurantTableAmount(this.ResturantId, item.size).subscribe((res: any) => {
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
            if (res._Data[0].NotificationMsg) {
                alert(res._Data[0].NotificationMsg);
            }
        });
        this.classForAccept = "success";
        this.classForSeated = "selected";
    }

    //Functionality for Seated
    seated(item) {
        this.dataOfTable = item;
        this.hostessService.getRestaurantTables(item.RestaurantID,1).subscribe((res: any) => {
            this.tableData = res._Data;
        });
    }

    //Functionality for submitting reastuarnt table
    submitRestaurantTable() {
        this.restaurantTableData = {
            "BookingID": 1,
            "TruflUserID": 1,
            "RestaurantID": 1,
            "PartySize": 2,
            "OfferType": 3,
            "OfferAmount": 1500,
            "BookingStatus": 3,
            "Points": 1,
            "TruflUserCardDataID": 1,
            "TruflTCID": 1,
            "ModifiedDate": "2017-09-07T11:18:40.5642008+05:30",
            "ModifiedBy": 1,
            "Quoted": "2017-09-07T11:18:40.5652011+05:30",
            "PaymentStatus": "Paid",
            "TableNumbers": "1",
            "LoggedInUser": 1
        }
    }

    //Selecting table
    selectTable(item) {
        this.tablesSelected.push(item);
    }

    //Functinality for closing restaurant table
    closeRestaurantTable() {
        this.classForAccept = "success";
        this.classForSeated = "selected";
    }

    //Functionality for Remove
    remove(item) {
        this.accepted = 5;
        this.hostessService.acceptedandremovedwaiteduser(item.RestaurantID, this.accepted).subscribe((res: any) => {
            alert(res._Data[0].NotificationMsg);
        });
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res._Data;
        });
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

}
