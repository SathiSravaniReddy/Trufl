
import { Component } from '@angular/core';
import { HostessService } from './hostess.service';

@Component({
    selector: 'hostess',
    templateUrl: './hostess.component.html'
})
export class HostessComponent {

    private truflUserList;

    constructor(private hostessService: HostessService) {
        this.hostessService.getTruflUserList().subscribe((res: any) => {
            this.truflUserList = res;
            console.log(this.truflUserList);
        });
    }

}