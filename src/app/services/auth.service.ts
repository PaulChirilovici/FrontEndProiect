import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';
  constructor(private http:HttpClient) { }

  login(data: { email: string, password: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Add your server's origin here or use * for any origin
      // Add other necessary headers here
    });

    const options = { headers: headers };
    console.log(JSON.stringify(data));
    return this.http.post(this.apiUrl, JSON.stringify(data), options);
  }
}
