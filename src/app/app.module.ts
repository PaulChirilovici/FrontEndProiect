import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet} from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainpageComponent } from './components/mainpage/mainpage.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import {MatRadioButton, MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainpageComponent,
    EmployeeFormComponent,
    DepartmentFormComponent,
    ChangePasswordFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    JwtModule
  ],
  providers: [{
    provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService],
  bootstrap: [AppComponent],

})
export class AppModule { }
