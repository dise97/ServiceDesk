import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private firebase: AngularFireDatabase) {}
  clientList: AngularFireList<any>;
  array= [];

  form: FormGroup=new FormGroup({
    $key: new FormControl(null),
    sifra: new FormControl(''),
    clientID: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    contPers: new FormControl('')
  });
  initializeFormGroup(){
    this.form.setValue({
    $key: null,
    sifra: '',
    clientID: '',
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    contPers: ''
    });
  }
  getClients(){
    this.clientList=this.firebase.list('clients');
    return this.clientList.snapshotChanges();
  }

  insertClient(client) {
    this.clientList.push({
      sifra: client.sifra,
      clientID: client.clientID,
      name: client.name,
      address: client.address,
      city: client.city,
      phone: client.phone,
      email: client.email,
      contPers: client.contPers
    });
  }
  updateClient(client){
    this.clientList.update(client.$key, {
      sifra: client.sifra,
      clientID: client.clientID,
      name: client.name,
      address: client.address,
      city: client.city,
      phone: client.phone,
      email: client.email,
      contPers: client.contPers
    });
  }
  deleteClient($key: string){
    this.clientList.remove($key);
  }
  populateForm(client){
    this.form.patchValue(_.omit(client, 'clientName'));
  }
}
