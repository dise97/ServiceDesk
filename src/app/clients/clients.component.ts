import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../app/shared/client.service';
import {NotificationService} from '../../app/shared/notification.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    x: string;

  constructor(public service: ClientService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ClientsComponent>) { }

  ngOnInit(): void {
    this.service.getClients();
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
        this.service.insertClient(this.service.form.value);
      else
      this.service.updateClient(this.service.form.value);
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
