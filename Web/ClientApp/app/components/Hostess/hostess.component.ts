
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
    private count = 0;
    private showProfile: boolean = false;
    private profileData: any = [];
    showSeatedButton: boolean = false;
    hideSeatedButton: boolean = false;
    showTurnSeats:boolean=false;
    showSeated:boolean=false;
    ActiveSeats: boolean = false;
    public currentSelectedUser: string;
    TableSize = [
        { 'size': 2, 'price': '$100' },
        { 'size': 4, 'price': '$150' },
        { 'size': 6, 'price': '$200' },
        { 'size': 8, 'price': '$250' },
        { 'size': 10, 'price': '$300' },
        { 'size': 12, 'price': '$350' },
        { 'size': 14, 'price': '$400' },
        { 'size': 16, 'price': '$450' },
        { 'size': 18, 'price': '$500' },
        { 'size': 20, 'price': '$550' },
    ];

    constructor(private hostessService: HostessService) {
        this.classForAccept = "selected";
        this.classForSeated = "";
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res._Data;
        });
    }

    watlistUserDetails(data) {
        console.log(data, "data");
        var _that = this;
        this.currentSelectedUser = data.Email;
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
            console.log(_that);
            if (obj.Email != data.Email) {
                obj.isShowLinks = false;
            }
        })

    }
    trunGetSeatedNow(){
        this.showSeated = true;
        this.hideSeatedButton = false;
    }

    OnTableSizeSelection(item) {

        var _that = this;
        if (this.showSeatedButton == true) {
            this.ActiveSeats = false;
        }
        else {
            this.ActiveSeats = true;
            this.priceOfTable = item.price;
            this.sizeOfTable = item.size;
            this.hideSeatedButton = false;
            event.stopPropagation();
        }

        this.truflUserList.map(function (obj) {
            console.log(_that);
            obj.isShowLinks = obj.Email == _that.currentSelectedUser;
        })

    }

    accept(item) {
        this.hideSeatedButton = false;
        this.ActiveSeats = false;
        this.showSeatedButton = true;
        this.count++;
        this.accepted = 2;
        event.stopPropagation();
        this.hostessService.acceptedandremovedwaiteduser(item.RestaurantID,this.accepted).subscribe((res: any) => {
            alert(res._Data[0].NotificationMsg);
        });
        this.classForAccept = "success";
        this.classForSeated = "selected";
    }

    remove(item) {
        this.accepted = 5;
        this.hostessService.acceptedandremovedwaiteduser(item.RestaurantID, this.accepted).subscribe((res: any) => {
            alert(res._Data[0].NotificationMsg);
        });
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res._Data;
        });
    }

    cancelSeats() {
        var _that = this;
        this.showTurnSeats = false;
        this.hideSeatedButton = false;
        this.ActiveSeats = false;
        this.showSeatedButton = true;
        this.truflUserList.map(function (obj) {
            console.log(_that);
            obj.isShowLinks = false;
        })
        this.count++;
        this.showProfile = false;
    }
    closeProile() {
        this.showProfile = false;
    }

}
