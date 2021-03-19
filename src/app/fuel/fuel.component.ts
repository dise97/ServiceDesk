import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FuelService } from '../shared/fuel.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {

    x: string;

  constructor(public service: FuelService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<FuelComponent>) { }

  ngOnInit(): void {
    this.service.getFuel();
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
        this.service.insertFuel(this.service.form.value);
      else
      this.service.updateFuel(this.service.form.value);
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
