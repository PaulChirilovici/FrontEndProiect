import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  addEmployee(data: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer '+localStorage.getItem("token"),
    });

    const options = { headers: headers };
    console.log(JSON.stringify(data));
    return this.http.post("http://localhost:8080/employee", JSON.stringify(data), options);
  }

  getDepartments(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer '+localStorage.getItem("token"),
    });

    const options = { headers: headers };
    console.log(options.headers.get('Authorization'));
    return this.http.get("http://localhost:8080/departments",{headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
          'Authorization': 'Bearer '+localStorage.getItem("token")!.toString()
        })});
  }

}
