
import { Component,OnInit } from '@angular/core';
import { RestaurenService } from './restaurent.service';
import { Pipe, PipeTransform } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'restaurant',
    templateUrl: './resturant.component.html'
})
export class ResturantComponent implements OnInit {
    public restaurent_info: any;

    user: FormGroup;
     name: FormControl; 


     constructor(private restaurenService: RestaurenService) {

        /*    this.myForm = new FormGroup({
                    restaurentname: new FormControl(''),                
                    emailid: new FormControl('', Validators.required),
                    contact1: new FormControl('', Validators.required),
                    contact2: new FormControl('', Validators.required),

                    address1: new FormControl('', Validators.required),
                    address2: new FormControl('', Validators.required),
                    state: new FormControl('', Validators.required),
                    zipcode: new FormControl('', Validators.required),


                    ownername: new FormControl('', Validators.required),

                    owneremail: new FormControl('', Validators.required),
                    ownercontact1: new FormControl('', Validators.required),
                    ownercontact2: new FormControl('', Validators.required),
                    description: new FormControl('', Validators.required)

                    
         });*/

    }
    ngOnInit() {

        this.getrestaurent();
    }
    public getrestaurent() {
        this.restaurenService.getRestaurentDetails().subscribe((res: any) => {

            this.restaurent_info = res.data;
            console.log(this.restaurent_info);
        })

    }  
}
@Pipe({
    name:'searchPipe'
})
export class SearchPipe implements PipeTransform {


    public transform(value, key: string, term: string) {

        if (value == null) {
            return null;
        }

        return value.filter((item) => {
            if (item.hasOwnProperty(key)) {
                if (term) {
                    let regExp = new RegExp('\\b' + term, 'gi');
                    return regExp.test(item[key]);
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    }


}



