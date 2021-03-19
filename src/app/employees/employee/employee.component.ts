import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EmployeeService} from '../../shared/employee.service';
import {ClientService} from '../../shared/client.service';
import {NotificationService} from '../../shared/notification.service';
import {MaintainerService} from '../../shared/maintainer.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ContractsService} from '../../shared/contracts.service';
import { WagesService } from 'src/app/shared/wages.service';
import {GetclientsService} from '../../shared/getclients.service';
import { GetwagepriceService } from 'src/app/shared/getwageprice.service';
import { GetdepartmentsService } from 'src/app/shared/getdepartments.service';
import { ChangeDetectionStrategy } from "@angular/core";
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { GetmaintainersService } from 'src/app/shared/getmaintainers.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class EmployeeComponent implements OnInit {

model={
  Dnevnica: null
}

log = 0;
showLog = false;

    onShowLog(){
         this.showLog = true;
         return this.log = this.log + 1;
    }

  constructor(public service: EmployeeService,
     public clientService: ClientService,
     public notificationService: NotificationService,
     public maintainerService: MaintainerService,
     public contractsService: ContractsService,
     public getwagepriceService: GetwagepriceService,
     public getmaintainersService: GetmaintainersService,
     public getclientsService: GetclientsService,
     private cdRef:ChangeDetectorRef,
     public getdepartmentsService: GetdepartmentsService,
     public dialogRef: MatDialogRef<EmployeeComponent>) { }

  ngOnInit() {

    this.service.getEmployees();
  }

onClear() {
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.notificationService.success(':: Uklonjeno!')
}
sifra(){
    var result:number;
    let counter=0;
    while (counter<=0) {
        counter+=1;
        result=counter++;
      }
      return result;
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
