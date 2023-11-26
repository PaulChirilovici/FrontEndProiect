import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    });

    const options = {headers: headers};
    console.log(options.headers.get('Authorization'));
    return this.http.get("http://localhost:8080/departments", {
      headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
          'Authorization': 'Bearer ' + localStorage.getItem("token")!.toString()
        })
    });
  }

  addDepartment(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    });

    const options = {headers: headers};

    var object = {
      "description": data.description,
    }

    console.log(object);
    return this.http.post("http://localhost:8080/departments", object, options);
  }
  updateDepartment(id:number,data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    });

    const options = {headers: headers};

    var object = {
      "description": data.description,
    }

    console.log(object);
    return this.http.put("http://localhost:8080/departments/"+id, object, options);
  }

  deleteDepartment(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    });

    const options = {headers: headers};
    return this.http.delete("http://localhost:8080/departments/"+id, options);
  }
}
