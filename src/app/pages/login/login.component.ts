import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email="";
    password="";
    errorMessage='';
    error: {name:string, message: string}={name:'', message:''};

  constructor(public authservice: AuthService, public router: Router) { }

  ngOnInit(): void {
  }
  clearErrorMessage(){
    this.errorMessage='';
    this.error={name: '', message:''};
}
login(){
    this.clearErrorMessage();
    if(this.validateForm(this.email, this.password)){
      this.authservice.loginWithEmail(this.email, this.password).then(()=>{
        this.router.navigate(['/app-main-nav'])
      }).catch(_error=>{
          this.error=_error
          this.router.navigate(['/login'])
      })
    }
}
validateForm(email, password){
    if(email.length===0){
        this.errorMessage="molimo unesite email id";
        return false;
    }
    if(password.length===0){
      this.errorMessage="molimo unesite lozinku";
      return false;
  }
  if(password.length<6){
      this.errorMessage="lozinka mora sadržavati najmanje 6 znakova";
      return false;
  }
  this.errorMessage='';
  return true;
  }
}
