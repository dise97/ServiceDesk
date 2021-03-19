import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetdepartmentsService } from '../shared/getdepartments.service';
import { MaintainerService } from '../shared/maintainer.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-maintainers',
  templateUrl: './maintainers.component.html',
  styleUrls: ['./maintainers.component.css']
})
export class MaintainersComponent implements OnInit {

    x: string;

  constructor(public service: MaintainerService,
    public notificationService: NotificationService,
    public getdepartmentsService: GetdepartmentsService,
    public dialogRef: MatDialogRef<MaintainersComponent>) { }

  ngOnInit(): void {
    this.service.getMaintainers();
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
  onSubmit(){
    if (this.service.form.valid){
      if (!this.service.form.get('$key').value)
        this.service.insertMaintainer(this.service.form.value);
      else
      this.service.updateMaintainer(this.service.form.value);
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
