import { Component, OnInit, ViewChild } from '@angular/core';
import {WagesService} from '../../app/shared/wages.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {WagesComponent} from '../../app/wages/wages.component';
import { NotificationService } from '../../app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { GetwagepriceService } from '../shared/getwageprice.service';

@Component({
  selector: 'wages-list',
  templateUrl: './wages-list.component.html',
  styleUrls: ['./wages-list.component.css']
})
export class WagesListComponent implements OnInit {

  constructor(public service: WagesService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public getwagepriceService: GetwagepriceService,
    public dialogService: DialogService) { }

    listData: MatTableDataSource<any>;
    displayColumns: string[]=['price1', 'actions'];
    @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {

    this.service.getWages().subscribe(
        list=>{
          let array = list.map(item=>{

            return{
              $key: item.key,

              ...item.payload.val()
            };
          });
          this.listData= new MatTableDataSource(array);
          this.listData.sort=this.sort;
          this.listData.paginator=this.paginator;
          this.listData.filterPredicate=(data, filter)=>{
            return this.displayColumns.some(ele=>{
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          }
        });
  }
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }
  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="700px";
    this.dialog.open(WagesComponent, dialogConfig);
  }
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="700px";
    this.dialog.open(WagesComponent, dialogConfig);
  }
  onDelete($key){
    this.dialogService.openConfirmDialog('Da li ste sigurni da želite izbrisati zapis?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteWage($key);
        this.notificationService.warn('! Izbrisano');
      }
    });
  }
}
