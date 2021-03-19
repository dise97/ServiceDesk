import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {ClientService} from '../../app/shared/client.service';
import { DatePipe } from '@angular/common';

import * as _ from 'lodash';
import { EmployeeComponent } from '../employees/employee/employee.component';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  contractList: AngularFireList<any>;
  clientList: AngularFireList<any>;
  array= [];

  constructor(private firebase: AngularFireDatabase, private clientService: ClientService,  private datePipe: DatePipe) {

    this.contractList=this.firebase.list('contracts');
    this.contractList.snapshotChanges().subscribe(list=>{
      this.array=list.map(item=>{
        return{
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });

   }
  form: FormGroup=new FormGroup({
    $key: new FormControl(null, Validators.required),
    sifra: new FormControl(''),
    number: new FormControl('', Validators.required),
    contrName: new FormControl('', Validators.required),
    startContrDate: new FormControl(new Date(), Validators.required),
    finishContrDate: new FormControl(new Date(), Validators.required),
    client: new FormControl('')
  });
  initializeFormGroup(){
    this.form.setValue({
    $key: null,
    sifra: '',
    number: '',
    contrName: '',
    startContrDate: '',
    finishContrDate: '',
    client: ''
    });
  }
  getContracts(){
    this.contractList=this.firebase.list('contracts');
    return this.contractList.snapshotChanges();
  }
  getClients(){
    this.clientList=this.firebase.list('clients');
    return this.clientList.snapshotChanges();
  }
  insertContract(contract) {
    this.contractList.push({
      sifra: contract.sifra,
      number: contract.number,
      contrName: contract.contrName,
      startContrDate: contract.startContrDate==""?"":this.datePipe.transform(contract.startContrDate, 'dd.MM.yyyy'),
      finishContrDate: contract.finishContrDate==""?"":this.datePipe.transform(contract.finishContrDate, 'dd.MM.yyyy'),
      client: contract.client
    });
  }
  updateContract(contract){
    this.contractList.update(contract.$key, {
      sifra: contract.sifra,
      number: contract.number,
      contrName: contract.contrName,
      startContrDate: contract.startContrDate==""?"":this.datePipe.transform(contract.startContrDate, 'dd.MM.yyyy'),
      finishContrDate: contract.finishContrDate==""?"":this.datePipe.transform(contract.finishContrDate, 'dd.MM.yyyy'),
      client: contract.client
    });
  }
  deleteContract($key: string){
    this.contractList.remove($key);
  }
  populateForm(contract){
    this.form.patchValue(_.omit(contract, 'clientName'));
  }
}
