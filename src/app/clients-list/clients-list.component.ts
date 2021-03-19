import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../app/shared/client.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ClientsComponent} from '../../app/clients/clients.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { NotificationService } from '../../app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { ViewChild } from '@angular/core';
import {GetclientsService} from '../../app/shared/getclients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  constructor(public service: ClientService,
  public dialog: MatDialog,
  public notificationService: NotificationService,
  public getclientsService: GetclientsService,
  public dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[]=['name', 'address', 'city', 'phone', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getClients().subscribe(
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
    this.dialog.open(ClientsComponent, dialogConfig);
  }
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="700px";
    this.dialog.open(ClientsComponent, dialogConfig);
  }
  onDelete($key){
    this.dialogService.openConfirmDialog('Da li ste sigurni da želite izbrisati zapis?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteClient($key);
        this.notificationService.warn('! Izbrisano');
      }
    });
  }
  }

