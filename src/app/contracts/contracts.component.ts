import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../../app/shared/contracts.service';
import {ClientService} from '../../app/shared/client.service';
import {NotificationService} from '../../app/shared/notification.service';
import {MatDialogRef} from '@angular/material/dialog';
import {GetclientsService} from '../../app/shared/getclients.service';


@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

    x: string;

  constructor(public service: ContractsService,
    public clientService: ClientService,
    public getclientsService: GetclientsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ContractsComponent>) { }

  ngOnInit(): void {
    this.service.getContracts();
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
        this.service.insertContract(this.service.form.value);
      else
      this.service.updateContract(this.service.form.value);
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
