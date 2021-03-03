import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { DatePipe } from '@angular/common';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  employeeList: AngularFireList<any>;

form: FormGroup=new FormGroup({
  $key: new FormControl(null),
  fullName: new FormControl('', Validators.required),
  department: new FormControl(''),
  startDate: new FormControl(new Date(), Validators.required),
  startTime: new FormControl('', Validators.required),
  finishTime: new FormControl('', Validators.required),
  isPermanent: new FormControl(false), //nije obavezno
  client: new FormControl(''),
  description: new FormControl('', Validators.required),
  remark: new FormControl(''), //nije obavezno
  serviceType: new FormControl('1'),
  isReplaceable: new FormControl(''),
  maintainer: new FormControl('')
});
initializeFormGroup(){
  this.form.setValue({
  $key: null,
  fullName: '',
  department: '',
  startDate: '',
  startTime: '',
  finishTime: '',
  isPermanent: false,
  client: '',
  description: '',
  remark: '',
  serviceType: '1',
  isReplaceable: '',
  maintainer: '',
  });
}

getEmployees(){
  this.employeeList=this.firebase.list('employees');
  return this.employeeList.snapshotChanges();
}
getMaintainers(){
  this.employeeList=this.firebase.list('maintainers');
  return this.employeeList.snapshotChanges();
}
insertEmployee(employee) {
  this.employeeList.push({
    fullName: employee.fullName,
    department: employee.department,
    startDate: employee.startDate==""?"":this.datePipe.transform(employee.startDate, 'dd.MM.yyyy'),
    startTime: employee.startTime,
    finishTime: employee.finishTime,
    isPermanent: employee.isPermanent,
    client: employee.client,
    description: employee.description,
    remark: employee.remark,
    serviceType: employee.serviceType,
    isReplaceable: employee.isReplaceable,
    maintainer: employee.maintainer
  });
}

updateEmployee(employee){
  this.employeeList.update(employee.$key, {
    fullName: employee.fullName,
    department: employee.department,
    startDate: employee.startDate==""?"":this.datePipe.transform(employee.startDate, 'dd.MM.yyyy'),
    startTime: employee.startTime,
    finishTime: employee.finishTime,
    isPermanent: employee.isPermanent,
    client: employee.client,
    description: employee.description,
    remark: employee.remark,
    serviceType: employee.serviceType,
    isReplaceable: employee.isReplaceable,
    maintainer: employee.maintainer
  });
}

deleteEmployee($key: string){
  this.employeeList.remove($key);
}
populateForm(employee){
  this.form.patchValue(_.omit(employee, 'clientName', 'maintainerName'));
}
}
