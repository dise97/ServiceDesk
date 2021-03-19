import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {WagesService} from '../../app/shared/wages.service';
import {NotificationService} from '../../app/shared/notification.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-wages',
  templateUrl: './wages.component.html',
  styleUrls: ['./wages.component.css']
})
export class WagesComponent implements OnInit {

    x: string;

  constructor(public service: WagesService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<WagesComponent>) { }

    ngOnInit(): void {
      this.service.getWages();
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
          this.service.insertWage(this.service.form.value);
        else
        this.service.updateWage(this.service.form.value);
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
