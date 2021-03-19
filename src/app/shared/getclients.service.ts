import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {ClientService} from '../../app/shared/client.service';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GetclientsService {
  clientList: AngularFireList<any>;
  array= [];

  constructor(private firebase: AngularFireDatabase) {
    this.clientList=this.firebase.list('clients');
    this.clientList.snapshotChanges().subscribe(list=>{
      this.array=list.map(item=>{
        return{
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
   }
   getClientName($key){
    if ($key=="0")
      return "";
    else{
      return _.find(this.array, (obj)=>{return obj.$key==$key;})['name']
    }
  }
}
