import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GetwagepriceService {


    wageList: AngularFireList<any>;
    array=[];
  constructor(private firebase: AngularFireDatabase) {

    this.wageList=this.firebase.list('wages');
    this.wageList.snapshotChanges().subscribe(list=>{
      this.array=list.map(item=>{
        return{
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
   }
   getWagePrice($key){
    if ($key=="0")
      return "";
    else{
      return _.find(this.array, (obj)=>{return obj.$key==$key;})['price1']
    }
  }
}
