import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuelComponent } from '../fuel/fuel.component';
import { DialogService } from '../shared/dialog.service';
import { FuelService } from '../shared/fuel.service';
import { GetfuelService } from '../shared/getfuel.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.css']
})
export class FuelListComponent implements OnInit {

  constructor(public service: FuelService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public getfuelService: GetfuelService,
    public dialogService: DialogService) { }

    listData: MatTableDataSource<any>;
    displayColumns: string[]=['fuelType','price', 'date', 'dateEdit', 'actions'];
    @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
      this.service.getFuel().subscribe(
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
    this.dialog.open(FuelComponent, dialogConfig);
  }
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="700px";
    this.dialog.open(FuelComponent, dialogConfig);
  }
  onDelete($key){
    this.dialogService.openConfirmDialog('Da li ste sigurni da želite izbrisati zapis?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteFuel($key);
        this.notificationService.warn('! Izbrisano');
      }
    });
}
}
