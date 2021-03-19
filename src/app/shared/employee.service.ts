import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, Form} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { DatePipe } from '@angular/common';
import {ClientService} from '../../app/shared/client.service';
import { ContractsService } from './contracts.service';
import { AngularFireAuth } from '@angular/fire/auth';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(public firebase: AngularFireDatabase, private datePipe: DatePipe, private afu: AngularFireAuth, public clientService: ClientService, public contractsService: ContractsService) {
      this.afu.authState.subscribe(employee=>{
          if(employee) this.userId=employee.uid
      })
  }

  employeeList: AngularFireList<any>;
  userId: string;
  clientList: AngularFireList<any>;
  contractList: AngularFireList<any>;
  array=[];

form: FormGroup=new FormGroup({
  $key: new FormControl(null),
  sifra: new FormControl(''),
  caseName: new FormControl(''),
  department: new FormControl(''),
  startDate: new FormControl(new Date()),
  startTime: new FormControl(''),
  finishTime: new FormControl(''),
  isPermanent: new FormControl(false), //nije obavezno
  description: new FormControl(''),
  remark: new FormControl(''), //nije obavezno
  serviceType: new FormControl('1'),
  isReplaceable: new FormControl(''),
  maintainer: new FormControl(''),
  contracts: new FormControl(''),
  dnevnica: new FormControl(''),
  client: new FormControl('')
});
initializeFormGroup(){
  this.form.setValue({
  $key: null,
  sifra: '',
  caseName: '',
  department: '',
  startDate: '',
  startTime: '',
  finishTime: '',
  isPermanent: false,
  description: '',
  remark: '',
  serviceType: '1',
  isReplaceable: '',
  maintainer: '',
  contracts: '',
  dnevnica: '',
  client: ''
  });
}

getEmployees(): Observable<any>{
  this.employeeList=this.firebase.list(`employees/${this.userId}`);
  return this.employeeList.snapshotChanges();
}

getMaintainers(){
  this.employeeList=this.firebase.list('maintainers');
  return this.employeeList.snapshotChanges();
}
getClients(){
  this.clientList=this.firebase.list('clients');
  return this.clientList.snapshotChanges();
}
getContracts(){
    this.contractList=this.firebase.list('contracts');
    return this.contractList.snapshotChanges();
  }

insertEmployee(employee) {
  this.employeeList.push({
    sifra: employee.sifra,
    caseName: employee.caseName,
    department: employee.department,
    startDate: employee.startDate==""?"":this.datePipe.transform(employee.startDate, 'dd.MM.yyyy'),
    startTime: employee.startTime,
    finishTime: employee.finishTime,
    isPermanent: employee.isPermanent,
    description: employee.description,
    remark: employee.remark,
    serviceType: employee.serviceType,
    isReplaceable: employee.isReplaceable,
    maintainer: employee.maintainer,
    contracts: employee.contracts,
    dnevnica: employee.dnevnica,
    client: employee.client
  });
}

updateEmployee(employee){
  this.employeeList.update(employee.$key, {
    sifra: employee.sifra,
    caseName: employee.caseName,
    department: employee.department,
    startDate: employee.startDate==""?"":this.datePipe.transform(employee.startDate, 'dd.MM.yyyy'),
    startTime: employee.startTime,
    finishTime: employee.finishTime,
    isPermanent: employee.isPermanent,
    description: employee.description,
    remark: employee.remark,
    serviceType: employee.serviceType,
    isReplaceable: employee.isReplaceable,
    maintainer: employee.maintainer,
    contracts: employee.contracts,
    dnevnica: employee.dnevnica,
    client: employee.client
  });
}

deleteEmployee($key: string){
  this.employeeList.remove($key);
}
populateForm(employee){
  this.form.patchValue(_.omit(employee, 'clientName', 'maintainerName'));
}
}
