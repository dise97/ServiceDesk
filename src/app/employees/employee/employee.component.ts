import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EmployeeService} from '../../shared/employee.service';
import {ClientService} from '../../shared/client.service';
import {NotificationService} from '../../shared/notification.service';
import {MaintainerService} from '../../shared/maintainer.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  myModel= 1;


  constructor(public service: EmployeeService,
     public clientService: ClientService,
     public notificationService: NotificationService,
     public maintainerService: MaintainerService,
     public dialogRef: MatDialogRef<EmployeeComponent>) { }


  ngOnInit(): void {
    this.service.getEmployees();
  }


onClear() {
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.notificationService.success(':: Uklonjeno!')
}

onSubmit(){
  if (this.service.form.valid){
    if (!this.service.form.get('$key').value)
      this.service.insertEmployee(this.service.form.value);
    else
    this.service.updateEmployee(this.service.form.value);
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
