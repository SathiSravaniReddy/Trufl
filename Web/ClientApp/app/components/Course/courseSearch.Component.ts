
import { Component } from '@angular/core';
import { CourseService } from '../shared/courseService';
import { CourseModel } from '../../Models/CourseModel';
 


@Component({
    selector: 'courseSearch',
    templateUrl: './courseSearch.Component.html'
})
export class CourseSearchComponent {
    
    private courseList;
    private Title: string;
    private Duration: number;
    


    constructor(private courseService: CourseService) {
        this.courseService.getAllCources().subscribe((res: any) => {
            this.courseList = res;
        });
    }
    CreateCourse()
    {
        //var course: CourseModel;

        //course.Title = this.Title;
        //course.CourseTypeID = 1;
        //course.FrequecyTypeID = 1;
        //course.Duration = this.Duration;
         
        //}
        var course = {
            Title:this.Title,
            CourseTypeID:1,
            FrequecyTypeID: 1,
            Duration: this.Duration
        }
 
        this.courseService.createCourse(course).subscribe((res: any) => {
            if (res == true)
            {
                alert("success");
                this.courseService.getAllCources().subscribe((res: any) => {
                    this.courseList = res;
                });
               
            } else
            {
                alert("Failed");
            }
        });
    }
}
