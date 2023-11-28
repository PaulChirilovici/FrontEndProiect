import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formGroup!: FormGroup;
  constructor(private authService:AuthService,private router:Router) {
  }
  ngOnInit(){
    this.initForm();
  }
  initForm(){
      this.formGroup=new FormGroup({
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    });

  }
  loginProcess(){
    if(this.formGroup.valid)
    {
      this.authService.login(this.formGroup.value).subscribe(response=>{
        console.log(response.token);
        localStorage.setItem("token",response.token);
        localStorage.setItem("email",this.formGroup.controls["email"].value);
        this.authService.storeUserData();
        this.router.navigate(['/mainpage']);
      },error => {
        alert("Incorrect user or password!");
      })
    }
  }

}
