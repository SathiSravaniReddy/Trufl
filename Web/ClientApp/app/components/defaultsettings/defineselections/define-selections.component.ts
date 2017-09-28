import { Component } from '@angular/core';
import { DefineSelectionService } from '../defineselections/define-selection.service'; 
import { Router } from '@angular/router';
@Component({
    selector: 'defineSelections',
    templateUrl: './define-selections.component.html',
   
})
export class DefineSelectionsComponent {
    
    private defineselectionsdetails;
    constructor(private _defineservice: DefineSelectionService, private router: Router) {
        

    }

    ngOnInit() {
        this.getDefineSelections();
       
    }
    getDefineSelections() {

        this._defineservice.getDefineSelectionDetails().subscribe((res: any) => {
            this.defineselectionsdetails = res._Data;
            console.log(this.defineselectionsdetails.name, "this.defineselectionsdetails");

        })


    }
     cancel() {
         this.router.navigateByUrl('/defaultSettings');
    }
     saveclose() {
         this.router.navigateByUrl('/defaultSettings');
     }


     private _opened: boolean = false;

     public _toggleSidebar() {
         this._opened = !this._opened;
     }
}
