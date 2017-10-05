import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'startService',
    templateUrl: './start-service.component.html',

})
export class StartServiceComponent {
    private time = '17:00';

    constructor(private router: Router) {

    }
    public next() {
        this.router.navigate(['/selectselections']);
        console.log(this.time);
    }
}
