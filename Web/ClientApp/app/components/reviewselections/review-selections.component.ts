import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'reviewSelections',
    templateUrl: './review-selections.component.html',

})
export class ReviewSelectionsComponent {
    constructor(private router: Router) {

    }
    public next() {
        this.router.navigateByUrl('/waitlist');
    }
    public back() {
        this.router.navigateByUrl('/selectStaff');
    }
}
