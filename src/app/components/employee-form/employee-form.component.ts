import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {DepartmentResponse} from "../../models/dto";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{
  empForm:FormGroup;
  departments: DepartmentResponse[]=[];
  managers: string[]=[
    'Vlad',
    'Paul',
    'Pompiliu'
  ];
  constructor(private fb:FormBuilder, private employeeService:EmployeeService,private authService:AuthService) {
    this.empForm=this.fb.group({
      fullname:'',
      email:'',
      role:'',
      department:'',
      manager:''
    })
  }
  onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.controls['email'].value);
      this.authService.register(this.empForm.value).subscribe(response=>{

      },error => {

      })
    }
  }

  ngOnInit(): void {
    this.employeeService.getDepartments().subscribe((response:DepartmentResponse[])=>{
      this.departments=response;
      console.log(this.departments)
    },error => {

    })

  }

}
