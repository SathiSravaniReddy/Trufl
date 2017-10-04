import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'selectStaff',
    templateUrl: './select-staff.component.html',

})
export class SelectStaffComponent {
    constructor(private router: Router) {

    }
    back() {
        this.router.navigateByUrl('/selectselections');
    }
    next() {
        this.router.navigateByUrl('/reviewSelections');
    }
}
