import { Component, OnInit, ViewChild } from '@angular/core';
import {ContractsService} from '../../app/shared/contracts.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { ClientService } from 'src/app/shared/client.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ContractsComponent} from '../../app/contracts/contracts.component';
import { NotificationService } from '../../app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import {GetclientsService} from '../../app/shared/getclients.service';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit {

  constructor(public service: ContractsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public getclientsService: GetclientsService,
    public dialogService: DialogService,
    public clientService: ClientService) { }

    listData: MatTableDataSource<any>;
  displayColumns: string[]=['contrName', 'clientName', 'startContrDate', 'finishContrDate', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {

    this.service.getContracts().subscribe(
      list=>{
        let array = list.map(item=>{
          let clientName=this.getclientsService.getClientName(item.payload.val()['client']);
          return{
            $key: item.key,
            clientName,
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
    this.dialog.open(ContractsComponent, dialogConfig);
  }
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="700px";
    this.dialog.open(ContractsComponent, dialogConfig);
  }
  onDelete($key){
    this.dialogService.openConfirmDialog('Da li ste sigurni da želite izbrisati zapis?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteContract($key);
        this.notificationService.warn('! Izbrisano');
      }
    });
  }
}
