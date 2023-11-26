import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DepartmentService} from "../../services/department.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit{
  departForm: FormGroup;
  constructor(private fb:FormBuilder,private departmentService:DepartmentService,private dialogRef:MatDialogRef<DepartmentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.departForm=this.fb.group({
      description:'',
    })
  }

  onSubmitForm() {
      if(this.departForm.valid)
      {
        if(this.data)
        {
          console.log(this.departForm.value);
          console.log(this.data)
          this.departmentService.updateDepartment(this.data.id,this.departForm.value).subscribe(res=>{
            this.dialogRef.close(true);

            alert("Successfully updated department!");
          },error => {
            this.dialogRef.close(true);
            alert("Successfully updated department!");
          });

        }else{
          console.log(this.departForm.value);
          this.departmentService.addDepartment(this.departForm.value).subscribe(res=>{
            this.dialogRef.close(true);
            alert("Successfully added department!");
          },error => {
            this.dialogRef.close(true);
            alert("Successfully added department!");
          });

        }

      }
  }

  ngOnInit(): void {
    console.log(this.data);
    this.departForm.patchValue(this.data);
  }

}
