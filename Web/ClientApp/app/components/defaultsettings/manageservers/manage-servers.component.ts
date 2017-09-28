import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'manageServers',
    templateUrl: './manage-servers.component.html',
   
})
export class ManageServersComponent {
    constructor(private router: Router) {


    }
    cancel() {
        this.router.navigateByUrl('/defaultSettings');
    }
    saveclose() {
        this.router.navigateByUrl('/defaultSettings');
    }
}
