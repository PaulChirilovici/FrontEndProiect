import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {
  constructor(private dialog:MatDialog) {
  }
  openAddEmployeeForm()
  {
    this.dialog.open(EmployeeFormComponent);
  }
}
