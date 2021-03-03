import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { ClientService } from 'src/app/shared/client.service';
import {MaintainerService} from 'src/app/shared/maintainer.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public service: EmployeeService,
    public clientService: ClientService,
    public maintainerService: MaintainerService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[]=['clientName', 'maintainerName', 'startTime', 'finishTime', 'startDate', 'progress', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {

  this.service.getEmployees().subscribe(
    list=>{
      let array = list.map(item=>{
        let clientName=this.clientService.getClientName(item.payload.val()['client']);
        let maintainerName=this.maintainerService.getMaintainerName(item.payload.val()['maintainer']);
        return{
          $key: item.key,
          clientName,
          maintainerName,
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
    this.dialog.open(EmployeeComponent, dialogConfig);
  }
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="700px";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }
  onDelete($key){
    this.dialogService.openConfirmDialog('Da li ste sigurni da želite izbrisati zapis?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteEmployee($key);
        this.notificationService.warn('! Izbrisano');
      }
    });
  }
}
