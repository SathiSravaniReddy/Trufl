import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SeatedService } from './seated.service'

@Component({
    selector:'seated',
    templateUrl: './seated.component.html',
    styleUrls: ['./seated.component.css']
})
export class SeatedComponent implements OnInit {

    private seatedinfo: any;
    isenabled = false;

   // private isValid = true;
    constructor(private seatedService: SeatedService) {
        //called first time before the ngOnInit()
    }

    ngOnInit() {
      
        console.log("loadingcomponent");
        //called after the constructor and called  after the first ngOnChanges() 
       this.seatedService.getSeatedDetails().subscribe((res: any) => {
            this.seatedinfo = res.data;           
            console.log(this.seatedinfo);
          
        }
        ); 

    }

    onCheckboxChange(index, event) {

        this.isenabled = true;
    }

}