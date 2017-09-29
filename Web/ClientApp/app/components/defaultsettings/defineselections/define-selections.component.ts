import { Component } from '@angular/core';
import { DefineSelectionService } from '../defineselections/define-selections.service'; 
import { Router } from '@angular/router';
@Component({
    selector: 'defineSelections',
    templateUrl: './define-selections.component.html',
    styleUrls: ['./define-selections.component.css'],
})
export class DefineSelectionsComponent {
    
    private defineselectionsdetails;
    //private isShow: boolean = false;
    private currentRow;
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


     showProfile(defineselections) {
         var _that = this;
         console.log(defineselections, "defineselectionsrwtert");
         //this.isShow = !this.isShow;
         this.currentRow =defineselections.name;
         this.defineselectionsdetails.map(function (obj) {
             obj.isShow = obj.name == _that.currentRow;
         });
     }






}
