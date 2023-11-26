import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {DepartmentFormComponent} from "../department-form/department-form.component";
import {ChangePasswordFormComponent} from "../change-password-form/change-password-form.component";
import {EmployeeService} from "../../services/employee.service";
import {MatTableDataSource} from '@angular/material/table';
import {DataSource} from "@angular/cdk/collections";
import {DepartmentService} from "../../services/department.service";
import {Router} from "@angular/router";

;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'managerId', 'departmentId', 'role', 'action'];
  dataSource: DataSource<any>;
  dataSourceDep: DataSource<any>;
  displayedColumnsDep: string[] = ['id', 'description', 'action'];
  constructor(private dialog: MatDialog, private employeeService: EmployeeService,private departmentServie:DepartmentService,private router:Router) {
  }

  openAddEmployeeForm() {
    const dialogRef = this.dialog.open(EmployeeFormComponent);
    dialogRef.afterClosed().subscribe(value => {
      if (value)
        this.getEmployeeList();
    });
  }

  openAddDepartmentForm() {
    const dialogRef=this.dialog.open(DepartmentFormComponent);
    dialogRef.afterClosed().subscribe(value => {
      if (value)
        this.getDepartmentList();
    });
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
  getDepartmentList()
  {
    this.departmentServie.getDepartments().subscribe(res=>{
      console.log(res);
      this.dataSourceDep=new MatTableDataSource(res)
    });
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.getDepartmentList();
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

  openEditFormDep(data) {
    const dialogRef=this.dialog.open(DepartmentFormComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe(value => {
      if (value)
        this.getDepartmentList();
    });
  }

  deleteDepartment(id) {
    this.departmentServie.deleteDepartment(id).subscribe(response => {
      alert("Department deleted!")
      this.getDepartmentList();
    },error => {
      alert("Department deleted!")
      this.getDepartmentList();
    });
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}


