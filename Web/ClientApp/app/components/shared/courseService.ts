
import { Http, Headers } from '@angular/http';
import { CourseModel } from '../../Models/CourseModel';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


@Injectable()

export class CourseService {

    constructor(private http: Http)
    {

    }
  public  getAllCources()
  {
      //alert('iam in service');
      return this.http.get("http://localhost:7706/api/Values/GetAllCources")
          .map(res => res.json() || {})
          .catch(this.handleError);
    }

  public createCourse(course:CourseModel) {

      
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:7706/api/Values/CreateCourse',course, {
          headers: headers
      }).map(res => res.json() || {})
          .catch(this.handleError);
      
  }
  private handleError(error: any)
  {
      //alert('Error');
      return 'Error';
  }
        
}

