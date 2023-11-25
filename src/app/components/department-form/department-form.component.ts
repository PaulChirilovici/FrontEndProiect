import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DepartmentService} from "../../services/department.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {
  departForm: FormGroup;
  constructor(private fb:FormBuilder,private departmentService:DepartmentService,private dialogRef:DialogRef) {
    this.departForm=this.fb.group({
      departmentName:'',
    })
  }

  onSubmitForm() {
      if(this.departForm.valid)
      {
        console.log(this.departForm.value);
        this.departmentService.addDepartment(this.departForm.value).subscribe();
        this.dialogRef.close();
        alert("Successfully added department!");
      }
  }
}
