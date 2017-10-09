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
    private selectionsname;
    private currentRow;
    public isShow: boolean = false;;
    constructor(private _defineservice: DefineSelectionService, private router: Router) {
        

    }
    
    ngOnInit() {
        this.getDefineSelections();
       
    }
    getDefineSelections() {
        var that = this;
        this._defineservice.getDefineSelectionDetails().subscribe((res: any) => {
            this.defineselectionsdetails = res._Data;
            console.log(this.defineselectionsdetails, "this.defineselectionsdetails");

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
         console.log(this.defineselectionsdetails, "sfgdfgdfgf");
         this.currentRow =defineselections.name;
         this.defineselectionsdetails.map(function (obj) {
             obj.isShow = obj.name == _that.currentRow;
             obj.definename = obj.name.split(" ");
             console.log(obj.definename, "  obj.definename");
         });

         this.isShow = true;
        
     }



     closeProile() {
       
         this.isShow = false;
         
     }


     addMore() {
         console.log(this.arr, "this.arr");
         this.arr.push({
             name: 'sravani',
             type: 'text',
             sectionStartNumber: '',
             sectionsEndNumber: '',
             labelName: 'Section Start Number'
         })
        
     }


  
     
    
}
