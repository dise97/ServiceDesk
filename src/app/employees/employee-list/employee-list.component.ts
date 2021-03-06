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
import {GetclientsService} from '../../shared/getclients.service';
import { GetmaintainersService } from 'src/app/shared/getmaintainers.service';
import {AuthService} from '../../shared/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

export class Item{
    body: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public service: EmployeeService,
    public clientService: ClientService,
    public getclientsService: GetclientsService,
    public getmaintainersService: GetmaintainersService,
    public dialog: MatDialog,
    public authservice: AuthService,
    public afu: AngularFireAuth,
    public router: Router,
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
        let maintainerName=this.getmaintainersService.getMaintainerName(item.payload.val()['maintainer']);
        let clientName=this.getclientsService.getClientName(item.payload.val()['client']);
        return{
          $key: item.key,
          maintainerName,
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
    }
    );
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
    this.dialogService.openConfirmDialog('Da li ste sigurni da ??elite izbrisati zapis?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteEmployee($key);
        this.notificationService.warn('! Izbrisano');
      }
    });
  }
}
