import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { DatePipe } from '@angular/common';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  fuelList: AngularFireList<any>;
  array= [];

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  form: FormGroup=new FormGroup({
    $key: new FormControl(null),
    sifra: new FormControl(''),
    fuelType: new FormControl(''),
    price: new FormControl(''),
    date: new FormControl(new Date()),
    dateEdit: new FormControl(new Date())
  });
  initializeFormGroup(){
    this.form.setValue({
    $key: null,
    sifra: '',
    fuelType: '',
    price: '',
    date: '',
    dateEdit: ''
    });
  }
  getFuel(){
    this.fuelList=this.firebase.list('fuel');
    return this.fuelList.snapshotChanges();
  }
  insertFuel(fuel) {
    this.fuelList.push({
      sifra: fuel.sifra,
      fuelType:  fuel.fuelType,
      price: fuel.price,
      date: fuel.date==""?"":this.datePipe.transform(fuel.date, 'dd.MM.yyyy'),
      dateEdit: fuel.dateEdit==""?"":this.datePipe.transform(fuel.dateEdit, 'dd.MM.yyyy')
    });
  }
  updateFuel(fuel){
    this.fuelList.update(fuel.$key, {
      sifra: fuel.sifra,
      fuelType:  fuel.fuelType,
      price: fuel.price,
      date: fuel.date==""?"":this.datePipe.transform(fuel.date, 'dd.MM.yyyy'),
      dateEdit: fuel.dateEdit==""?"":this.datePipe.transform(fuel.dateEdit, 'dd.MM.yyyy')
    });
  }
  deleteFuel($key: string){
    this.fuelList.remove($key);
  }
  populateForm(fuel){
    this.form.patchValue(_.omit(fuel, ''));
  }
}
