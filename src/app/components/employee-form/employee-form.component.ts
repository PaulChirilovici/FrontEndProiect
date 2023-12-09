import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {DepartmentResponse, ManagerResponse} from "../../models/dto";
import {HttpStatusCode} from "@angular/common/http";
import {DepartmentService} from "../../services/department.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{
  empForm:FormGroup;
  departments: DepartmentResponse[]=[];
  managers: ManagerResponse[]=[];
  employees:ManagerResponse[]=[];
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
        console.log(this.data.departmentId);

        if(this.data.departmentId!==this.empForm.controls['departmentId'] && this.empForm.controls['role'].value==="Manager" && this.data.name===this.empForm.controls['name'].value)
        { console.log("a intrat");

          const isEmployeeWithDepartmentId = this.employees.some(
            employee => ((employee.departmentId === this.data.departmentId && employee.role==='Employee'))
          );
          let numberOfManagers = 0;

          // Assuming this.employees is an array of employees
          this.employees.forEach(employee => {
            if (employee.role === 'Manager' && employee.departmentId === this.data.departmentId) {
              numberOfManagers++;
            }
          });
          if(isEmployeeWithDepartmentId && numberOfManagers<2) {
            alert("Before changing the department for this manager, migrate the employees from this department.")
            return;
          }
        }
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
          alert("Cannot save 2 employees with same email!");
        })
      }
    }
  }
  onDepartmentChange(selectedDepartment: any) {
    this.getEmployeeList();
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
      this.empForm.controls["managerId"].setValue("");
      this.empForm.controls["managerId"].disable();
    }
    else
      this.empForm.controls["managerId"].enable();
  }
  getEmployeeList() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees=res;
        console.log(this.employees);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {

    if(this.data){
      this.employeeService.getManagers(this.data.departmentId).subscribe((response:ManagerResponse[])=>{
        this.managers=response;
        console.log(this.departments)
      },error => {

      })
    }
    this.deparmentService.getDepartments().subscribe((response:DepartmentResponse[])=>{
      this.departments=response;

      console.log(this.departments)
      console.log(this.data.managerId);
      // Check if the property names match, adjust accordingly
      const patchValueData = {
        name: this.data.name,
        email: this.data.email,
        role: this.data.role,
        departmentId: this.data.departmentId, // leave the departmentId as is
        managerId: this.data.managerId
      };

      // Map departmentId to department description
      const department = this.departments.find(dep => dep.id === this.data.departmentId);
      const manager = this.managers.find(man => man.id === this.data.managerId);
      if (department) {
        patchValueData.departmentId = department;
        console.log(patchValueData.departmentId);
      }
      if(manager)
      {
        patchValueData.managerId=manager;
        console.log(manager);
      }
      this.empForm.patchValue(patchValueData);

    },error => {

    })


  }


}
