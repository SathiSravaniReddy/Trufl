
import { Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import { HostessService } from './hostess.service';
import { PaginationControlsComponent } from 'ngx-pagination';
import { ToastOptions } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'hostess',
    templateUrl: './hostess.component.html',
    styleUrls: ['./hostess.component.css'],
    providers: [ToastsManager, ToastOptions]
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
    private multipleTables;
    private rowshow;
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

    constructor(private hostessService: HostessService, private _toastr: ToastsManager, vRef: ViewContainerRef) {
        this._toastr.setRootViewContainerRef(vRef);
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
        this.rowshow = true;
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
        this.hostessService.getRestaurantTables(item.RestaurantID,1).subscribe((res: any) => {
            this.tableData = res._Data;
            this.classForAccept = "success";
            this.classForSeated = "selected";
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

}
