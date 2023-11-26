import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {DepartmentResponse, ManagerResponse} from "../../models/dto";
import {HttpStatusCode} from "@angular/common/http";
import {DepartmentService} from "../../services/department.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{
  empForm:FormGroup;
  departments: DepartmentResponse[]=[];
  managers: ManagerResponse[]=[];
  constructor(private fb:FormBuilder, private employeeService:EmployeeService,private deparmentService:DepartmentService,private dialogRef:MatDialogRef<EmployeeFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.empForm=this.fb.group({
      name:'',
      email:'',
      role:'',
      departmentId:'',
      managerId:''
    })
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data)
      {//update
        console.log(this.empForm.value);
        this.employeeService.updateEmployee(this.data.id,this.empForm.value).subscribe(response=>{
          this.dialogRef.close(true);
          alert("Successfully updated employee!");
        },error => {
          console.log("EMPPLOYEE ")
          alert("Cannot change email.")
          console.log(error);
        })

      }else {
        console.log(this.empForm.value);
        this.employeeService.addEmployee(this.empForm.value).subscribe(response=>{
          console.log("S-A ADAUGAT EMPLOYEE");
          this.dialogRef.close(true);
          alert("Successfully added employee!");
        },error => {

          console.log("EMPPLOYEE ")
          console.log(error);
        })
      }
    }
  }
  onDepartmentChange(selectedDepartment: any) {
    const selectedIndex = selectedDepartment.id;
    console.log(selectedIndex);
    this.employeeService.getManagers(selectedIndex).subscribe((response:ManagerResponse[])=>{
      this.managers=response;
      console.log(this.departments)
    },error => {

    })
  }

  onManagerChange(selectedManager: any){
    console.log(selectedManager.value);
    if(selectedManager.value=="Manager") {
      this.empForm.controls["manager"].disable();
    }
    else
      this.empForm.controls["manager"].enable();
  }

  ngOnInit(): void {
    this.deparmentService.getDepartments().subscribe((response:DepartmentResponse[])=>{
      this.departments=response;
      console.log(this.departments)
      console.log(this.data.departmentId);
    },error => {

    })
    this.empForm.patchValue(this.data);
  }


}
