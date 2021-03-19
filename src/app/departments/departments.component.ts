import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentsService } from '../shared/departments.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

    x: string;
index:number;
  constructor(public service: DepartmentsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<DepartmentsComponent>) { }

    ngOnInit(): void {
        this.service.getDepartments();
        this.x = this.makeid(15);
        
      }
      onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Uklonjeno!')
      }
      makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_!ĐđŽžĆćČčŠš?';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     sifra(){
        var result:number;
        for (var index = 0; index < 999999; ++index) {
            result=index;
          }
          return result;
     }
      onSubmit(){
        if (this.service.form.valid){
          if (!this.service.form.get('$key').value)
            this.service.insertDepartment(this.service.form.value);
          else
          this.service.updateDepartment(this.service.form.value);
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.notificationService.success(':: Uspješno dodano!')
          this.onClose();
        }
      }
      onClose(){
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
      }

  }
