import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './app/employees/employee-list/employee-list.component';
import { ContactComponent } from './app/contact/contact.component';
import { ContractsListComponent } from './app/contracts-list/contracts-list.component';
import { ClientsListComponent } from './app/clients-list/clients-list.component';
import { AppComponent } from './app/app.component';
import { WagesListComponent } from './app/wages-list/wages-list.component';
import { DepartmentsListComponent } from './app/departments-list/departments-list.component';
import { MaintainersListComponent } from './app/maintainers-list/maintainers-list.component';
import { FuelListComponent } from './app/fuel-list/fuel-list.component';
import {LoginComponent} from '../../AngularProject/src/app/pages/login/login.component';
import { RegisterComponent } from '../../AngularProject/src/app/pages/register/register.component';
import { UserinfoComponent } from '../../AngularProject/src/app/pages/userinfo/userinfo.component';
import { MainNavComponent } from './app/main-nav/main-nav.component';

const routes: Routes = [
    {
        path: 'app-root',
        component: AppComponent,
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'app-main-nav',
        component: MainNavComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'userinfo',
        component: UserinfoComponent
    },
    {
        path: 'employee-list',
        component: EmployeeListComponent,
    },
    {
        path: 'departments-list',
        component: DepartmentsListComponent,
    },
    {
        path: 'fuel-list',
        component: FuelListComponent
    },
    {
        path: 'maintainers-list',
        component: MaintainersListComponent
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'contracts-list',
        component: ContractsListComponent,
    },
    {
        path: 'wages-list',
        component: WagesListComponent,
    },
    {
        path: 'clients-list',
        component: ClientsListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
