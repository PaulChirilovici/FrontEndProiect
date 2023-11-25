import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DepartmentService} from "../../services/department.service";
import {AuthService} from "../../services/auth.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {

  changePassForm: FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private dialogRef:DialogRef) {
    this.changePassForm=this.fb.group({
      newPassword:'',
    })
  }

  onSubmitForm() {
    if(this.changePassForm.valid)
    {
      console.log(this.changePassForm.value);
      this.authService.changePassword(this.changePassForm.value).subscribe();
      this.dialogRef.close();
      alert("Successfully changed password!")
    }
  }
}
