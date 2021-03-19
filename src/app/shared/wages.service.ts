import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {EmployeeService} from '../../app/shared/employee.service';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WagesService {
  wageList: AngularFireList<any>;
  array= [];

  constructor(private firebase: AngularFireDatabase,
    public employeeService: EmployeeService) {}

   form: FormGroup=new FormGroup({
    $key: new FormControl(null, Validators.required),
    sifra: new FormControl(''),
    price1: new FormControl(null, Validators.required)
  });
  initializeFormGroup(){
    this.form.setValue({
    $key: null,
    sifra: '',
    price1: null
    });
  }
  getWages(){
    this.wageList=this.firebase.list('wages');
    return this.wageList.snapshotChanges();
  }
  insertWage(wage) {
    this.wageList.push({
      sifra: wage.sifra,
      price1: wage.price1
    });
  }
  updateWage(wage){
    this.wageList.update(wage.$key, {
      sifra: wage.sifra,
      price1: wage.price1
    });
  }
  deleteWage($key: string){
    this.wageList.remove($key);
  }
  populateForm(contract){
    this.form.patchValue(_.omit(contract, ''));
  }
}
