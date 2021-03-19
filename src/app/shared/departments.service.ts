import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {EmployeeService} from '../../app/shared/employee.service';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  departmentList: AngularFireList<any>;
  array= [];

  constructor(private firebase: AngularFireDatabase,
    public employeeService: EmployeeService) {}

   form: FormGroup=new FormGroup({
    sifra: new FormControl(''),
    $key: new FormControl(null),
    departmentName: new FormControl('')
  });
  initializeFormGroup(){
    this.form.setValue({
    $key: null,
    sifra: '',
    departmentName: ''
    });
  }
  getDepartments(){
    this.departmentList=this.firebase.list('departments');
    return this.departmentList.snapshotChanges();
  }
  insertDepartment(department) {
    this.departmentList.push({
      sifra: department.sifra,
      departmentName: department.departmentName
    });
  }
  updateDepartment(department){
    this.departmentList.update(department.$key, {
      sifra: department.sifra,
      departmentName: department.departmentName
    });
  }
  deleteDepartment($key: string){
    this.departmentList.remove($key);
  }
  populateForm(department){
    this.form.patchValue(_.omit(department, ''));
  }
}
