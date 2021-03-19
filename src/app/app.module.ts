import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {EmployeeService} from './shared/employee.service';
import { MatNativeDateModule } from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {ClientService} from './shared/client.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import {MaintainerService} from './shared/maintainer.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app-routing.module';
import { ContactComponent } from './contact/contact.component';
import {ProgressBarModule} from "angular-progress-bar";
import { DatePipe } from '@angular/common';
import { ContractsComponent } from './contracts/contracts.component';
import { WagesComponent } from './wages/wages.component';
import { NgxPrintModule } from 'ngx-print';
import { ContractsListComponent } from './contracts-list/contracts-list.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsComponent } from './clients/clients.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { WagesListComponent } from './wages-list/wages-list.component';
import { MaintainersComponent } from './maintainers/maintainers.component';
import { MaintainersListComponent } from './maintainers-list/maintainers-list.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { KeyIdPipe } from './key-id.pipe';
import { FuelComponent } from './fuel/fuel.component';
import { FuelListComponent } from './fuel-list/fuel-list.component';
import {LoginComponent} from '../../src/app/pages/login/login.component';
import {RegisterComponent} from '../../src/app/pages/register/register.component';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent,
    MainNavComponent,
    ContactComponent,
    ContractsComponent,
    WagesComponent,
    ContractsListComponent,
    ClientsListComponent,
    ClientsComponent,
    WagesListComponent,
    MaintainersComponent,
    MaintainersListComponent,
    DepartmentsComponent,
    DepartmentsListComponent,
    KeyIdPipe,
    FuelComponent,
    FuelListComponent,

],
  imports: [
    BrowserModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatCheckboxModule,
        MatButtonModule,

        MatInputModule,

        MatAutocompleteModule,
        MatDatepickerModule,

        MatFormFieldModule,

        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatStepperModule,
        MatTabsModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule,
        LayoutModule,
        HttpClientModule,
        AppRoutingModule,
        ProgressBarModule,
        NgxPrintModule,
        AngularFireAuthModule
  ],
  exports: [MatFormFieldModule, MatInputModule, RouterModule],
  providers: [EmployeeService, AuthService, ClientService, MaintainerService, DatePipe, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent, MatConfirmDialogComponent, EmployeeListComponent]
})
export class AppModule { }
