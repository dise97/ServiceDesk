import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './app/employees/employee-list/employee-list.component';
import { EmployeeComponent } from './app/employees/employee/employee.component';
import {ContactComponent} from './app/contact/contact.component';
import { DefaultComponent } from './app/layouts/default/default.component';
import { DashboardComponent } from './app/modules/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'default',
    component: DefaultComponent,
    children: [{
      path: '',
      component: DashboardComponent
    }]
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
