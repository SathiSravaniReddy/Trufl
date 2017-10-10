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
    private currentRow;
    private currentimage;
    public isShow:boolean=false;
    constructor(private router: Router, private _managerservice: ManageServersService) {
        this.getmanagerServer();

    }
    getmanagerServer(){
        var that = this;
        this._managerservice.getManageServersDetails().subscribe((res: any) => {
            this.manageserverdetails = res._Data;
            console.log(this.manageserverdetails, "this.manageserverdetails");

        })


    }

    showProfile(manageserver) {
        var _that = this;
        console.log(manageserver, "defineselectionsrwtert");
        console.log(this.manageserverdetails, "sfgdfgdfgf");
        this.currentRow = manageserver.FullName;
        this.currentimage = manageserver.pic
        //this.manageserverdetails.map(function (obj) {
        //    obj.isShow = obj.name == _that.currentRow;
        //    obj.definename = obj.name.split(" ");
        //    console.log(obj.definename, "  obj.definename");
        //});
        this.isShow = true;


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
