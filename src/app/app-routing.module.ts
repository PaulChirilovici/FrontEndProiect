import { NgModule } from '@angular/core';
import {Routes,RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {MainpageComponent} from "./components/mainpage/mainpage.component";
import {EmployeeFormComponent} from "./components/employee-form/employee-form.component";

const routes:Routes=[
  {path:'',component:LoginComponent},
  {path:'mainpage',component:MainpageComponent},
  {path:'employeeform',component:EmployeeFormComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
