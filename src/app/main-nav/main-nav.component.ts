import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {EmployeeListComponent} from '../../app/employees/employee-list/employee-list.component';
import {Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],

})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public router: Router) {}


    ngOnInit(): void {
    }

}
