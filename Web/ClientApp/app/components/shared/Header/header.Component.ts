
import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    selector: 'shared-header',
    templateUrl:'./header.Component.html'
})
export class HeaderComponent {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }
    ChangeRouteTo(route)
    {
        if (route == 'Course')
        {
            this.router.navigate(["course"]);
        }
        if (route == 'Person')
        {
            this.router.navigate(["personDetails","123"]);
        }
    }
}
