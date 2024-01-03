import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {delay, Observable, of, Subscription} from "rxjs";
import {Router} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';
  tokenSubscription = new Subscription()
  timeout;
  constructor(private http:HttpClient,private router:Router) { }

  login(data: { email: string, password: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
    });

    const options = { headers: headers };
    console.log(JSON.stringify(data));
    return this.http.post(this.loginUrl, JSON.stringify(data), options);
  }
  register(data: { email: string}): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer '+localStorage.getItem("token"),
    });

    const options = { headers: headers };
    var object={"email":data.email,
      "password": "pass123"
    }

    console.log(object);
    return this.http.post(this.registerUrl, object, options);
  }
  changePassword(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    });

    const options = {headers: headers};

    var object = {
      "email": localStorage.getItem("email"),
      "newPassword":data.newPassword
    }

    console.log(object);
    return this.http.post("http://localhost:8080/employee/rpassword", object, options);
  }

  logout() {
    this.tokenSubscription.unsubscribe();
    localStorage.removeItem("token");
    sessionStorage.clear();
  }
}
