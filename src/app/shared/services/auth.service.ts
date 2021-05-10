import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';


interface AuthResponse {
  message? : string;
  error? : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router :Router) { }
   error$: Subject<any> = new Subject<any>();

  private catch(er : HttpErrorResponse){
    console.log(er);
    this.error$.next(er.error.error)
    return throwError(er);
  }

  public Register(user : User){
    this.error$.next("")
    return this.http.post<AuthResponse>("/api/auth/register",user).pipe(
    catchError(this.catch.bind(this))
    )

  }
  public Logout(){
    localStorage.removeItem("token_name")
    localStorage.removeItem("token_exp")
    this.router.navigate(["/"])

  }

  Login(user: User) {
    this.error$.next("")
    return this.http.post<AuthResponse>(`/api/auth/login`,user).pipe(
      catchError(this.catch.bind(this))
    )

  }

  public get Token(){
    if (new Date() >new Date(localStorage.getItem("token_exp") + new Date().getTime()) ) {
      this.Logout();
    }
    return localStorage.getItem("token_name")
  }

  public isAuth(){
    return !!this.Token;
  }
}
