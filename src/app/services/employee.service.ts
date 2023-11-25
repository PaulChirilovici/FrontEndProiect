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
    if(data.role=="Employee")
    var object={
      "name": data.name,
      "email": data.email,
      "managerId": data.managerId.id,
      "departmentId": data.departmentId.id,
      "role": data.role
    }
    else
    {
      object={
        "name": data.name,
        "email": data.email,
        "managerId": null,
        "departmentId": data.departmentId.id,
        "role": data.role
      }
    }
    console.log(object);
    return this.http.post("http://localhost:8080/employee", object, options);
  }



    getManagers(selectedIndex: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer '+localStorage.getItem("token"),
    });

    const options = { headers: headers };
    console.log(options.headers.get('Authorization'));
    return this.http.get("http://localhost:8080/manager/department/"+selectedIndex,{headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
          'Authorization': 'Bearer '+localStorage.getItem("token")!.toString()
        })});
  }

  getEmployees(): Observable<any>{
    return this.http.get("http://localhost:8080/employee",{headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
          'Authorization': 'Bearer '+localStorage.getItem("token")!.toString()
        })});
  }
  deleteEmployee(id:any): Observable<any>{
    return this.http.delete("http://localhost:8080/employee/"+id,{headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
          'Authorization': 'Bearer '+localStorage.getItem("token")!.toString()
        })});
  }
  updateEmployee(id:any,data:any): Observable<any>{
    var object={
      "id": id,
      "name": data.name,
      "email": data.email,
      "managerId": data.managerId.id,
      "departmentId": data.departmentId.id,
      "role": data.role
    }
    console.log(object);
    return this.http.put("http://localhost:8080/employee/"+id,object,{headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
          'Authorization': 'Bearer '+localStorage.getItem("token")!.toString()
        })});
  }

}
