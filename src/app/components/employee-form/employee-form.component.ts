import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  empForm:FormGroup;
  departments: string[]=[
    'HR',
    'Development',
    'Marketing'
  ];
  managers: string[]=[
    'Vlad',
    'Paul',
    'Pompiliu'
  ];
  constructor(private fb:FormBuilder) {
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
      console.log(this.empForm.value);
    }
  }
}
