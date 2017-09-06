
import { Component, ViewEncapsulation } from '@angular/core';
import { HostessService } from './hostess.service';

@Component({
    selector: 'hostess',
    templateUrl: './hostess.component.html',
    styleUrls: ['./hostess.component.css']
})
export class HostessComponent {

    private truflUserList;
    private priceOfTable;
    private sizeOfTable;
    private count = 0;
    private showProfile: boolean = false;
    private profileData: any = [];
    showSeatedButton: boolean = false;
    properties: boolean = false;
    hideSeatedButton: boolean = false;
    showTurnSeats:boolean=false;
    showSeated:boolean=false;
    ActiveSeats: boolean = false;
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
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res._Data;
        });
    }

    watlistUserDetails(data) {
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
          
    }

    trunGetSeatedNow(){
        this.showSeated = true;
        this.hideSeatedButton = false;
    }

    OnTableSizeSelection(item) {
        if (this.showSeatedButton == true) {
            this.ActiveSeats = false;
        }
        else {
            this.properties = true;
            this.ActiveSeats = true;
            this.priceOfTable = item.price;
            this.sizeOfTable = item.size;
            this.hideSeatedButton = false;
            event.stopPropagation();
        }
    }

    accept(item) {
        this.hideSeatedButton = false;
        this.ActiveSeats = false;
        this.showSeatedButton = true;
        this.count++;
        alert("Accepted");
        event.stopPropagation();
    }

    cancelSeats() {
        this.showTurnSeats = false;
        this.hideSeatedButton = false;
        this.properties = false;
        this.ActiveSeats = false;
        this.showSeatedButton = true;
    }
    closeProile() {
        this.showProfile = false;
    }

}