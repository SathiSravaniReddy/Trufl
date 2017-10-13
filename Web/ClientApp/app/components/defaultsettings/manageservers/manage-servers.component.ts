import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageServersService } from '../manageservers/manage-servers.service'; 
@Component({
    selector: 'manageServers',
    templateUrl: './manage-servers.component.html',
    styleUrls: ['./manage-servers.component.css'],
})
export class ManageServersComponent {
    private manageserverdetails;
    private floordetails
    private currentRow;
    private currentimage;
    private currentfloorname;
    private filterfloorname;
    private selectedFloorName;
    public isShow: boolean = false;
    private visible: boolean = false;
    public isChecked: boolean = false;
    constructor(private router: Router, private _managerservice: ManageServersService) {
        this.getmanagerServer();

    }
    getmanagerServer(){
        var that = this;
        this._managerservice.getManageServersDetails().subscribe((res: any) => {
            this.manageserverdetails = res._Data;
          
        })
    }
    getFloorDetails(manageserver) {
        var _that = this;
       
        this._managerservice.getFloorDetails().subscribe((res: any) => {
            this.floordetails = res._Data;
          
            this.filterfloorname = _that.floordetails.filter(function (obj) {
               
                return obj.FloorNumber === manageserver.RestaurantFloorNumber;
            });
            if (this.filterfloorname.length > 0) {
                this.selectedFloorName = this.filterfloorname[0].FloorNumber;
                
            }
            if (manageserver.RestaurantFloorNumber == null) {
                this.selectedFloorName = '';
            }
        })

       

       
       
    }

    showProfile(manageserver) {
        var _that = this;
        this.getFloorDetails(manageserver);
        
       
        this.currentRow = manageserver.FullName;
        this.currentimage = manageserver.pic;
        
        this.isShow = true;
       
        this.isChecked = false;

    }

    closeprofile() {
        this.isShow = false;
    }

    
    cancel() {
        this.router.navigateByUrl('/defaultSettings');
    }
    saveclose() {
        this.router.navigateByUrl('/defaultSettings');
    }
}
