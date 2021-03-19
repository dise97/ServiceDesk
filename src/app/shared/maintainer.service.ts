import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {EmployeeService} from '../../app/shared/employee.service';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MaintainerService {
  maintainerList: AngularFireList<any>;
  array= [];

  constructor(private firebase: AngularFireDatabase,
    public employeeService: EmployeeService) {}

   form: FormGroup=new FormGroup({
    $key: new FormControl(null),
    sifra: new FormControl(''),
    fullName: new FormControl(''),
    odjel: new FormControl('')
  });
  initializeFormGroup(){
    this.form.setValue({
    $key: null,
    sifra: '',
    fullName: '',
    odjel: ''
    });
  }
  getMaintainers(){
    this.maintainerList=this.firebase.list('maintainers');
    return this.maintainerList.snapshotChanges();
  }
  insertMaintainer(maintainer) {
    this.maintainerList.push({
      sifra: maintainer.sifra,
      fullName: maintainer.fullName,
      odjel:  maintainer.odjel
    });
  }
  updateMaintainer(maintainer){
    this.maintainerList.update(maintainer.$key, {
      sifra: maintainer.sifra,
      fullName: maintainer.fullName,
      odjel:  maintainer.odjel
    });
  }
  deleteMaintainer($key: string){
    this.maintainerList.remove($key);
  }
  populateForm(maintainer){
    this.form.patchValue(_.omit(maintainer, ''));
  }
}

