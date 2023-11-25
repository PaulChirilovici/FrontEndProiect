import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {DepartmentFormComponent} from "../department-form/department-form.component";
import {ChangePasswordFormComponent} from "../change-password-form/change-password-form.component";
import {EmployeeService} from "../../services/employee.service";
import {MatTableDataSource} from '@angular/material/table';
import {DataSource} from "@angular/cdk/collections";

;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'managerId', 'departmentId', 'role', 'action'];
  dataSource: DataSource<any>

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) {
  }

  openAddEmployeeForm() {
    const dialogRef = this.dialog.open(EmployeeFormComponent);
    dialogRef.afterClosed().subscribe(value => {
      if (value)
        this.getEmployeeList();
    });
  }

  openAddDepartmentForm() {
    this.dialog.open(DepartmentFormComponent);
  }

  openAddChangePasswordForm() {
    this.dialog.open(ChangePasswordFormComponent);
  }

  getEmployeeList() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  ngAfterViewInit(): void {

  }

  openEditForm(data) {
    const dialogRef=this.dialog.open(EmployeeFormComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe(value => {
      if (value)
        this.getEmployeeList();
    });
  }

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe(response => {
      alert("Employee deleted!")
      this.getEmployeeList();
    });
  }
}


