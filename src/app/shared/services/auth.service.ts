import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {UtilsService} from "../../utils.service";


interface AuthResponse {
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private utils: UtilsService) {

    console.log("Init")


  }

  error$: Subject<any> = new Subject<any>();
  private observableIsAdmin(): Observable<boolean> {
    if ((new Date()) > new Date(localStorage.getItem("isAdminExp"))) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isAdminExp")
    }
    if (localStorage.getItem("isAdmin")) {
      return of(Boolean(localStorage.getItem("isAdmin")=='true'))
    }
    return this.http.get<boolean>("/api/auth/isAdmin").pipe(tap(
      (isAdmin: boolean) => {
        localStorage.setItem("isAdmin", String(isAdmin));
        localStorage.setItem("isAdminExp", String(new Date(new Date().getTime() + 1000 * 60 * 2)))
      }
    ))
  }

  public isAdmin() {
    return this.observableIsAdmin().pipe(tap(isAdmin => {
      if (!isAdmin) {
        this.utils.openSnackBar("Вы не являетесь администратором для совершения этого действия!", "Ошибка доступа")
      }
    }))
  }
public get isAdminSimple(){
    return localStorage.getItem("isAdmin")=="true";
}
  private catch(er: HttpErrorResponse) {
    console.log(er);
    this.error$.next(er.error.error)
    return throwError(er);
  }

  public Register(user: User) {
    this.error$.next("")
    return this.http.post<AuthResponse>("/api/auth/register", user).pipe(
      catchError(this.catch.bind(this))
    )

  }

  public Logout() {
    localStorage.removeItem("token_name")
    localStorage.removeItem("token_exp")
    this.router.navigate(["/"])

  }

  Login(user: User) {
    this.error$.next("Test")
    return this.http.post<AuthResponse>(`/api/auth/login`, user).pipe(
      catchError(this.catch.bind(this))
    )

  }

  public get Token() {
    if (new Date() > new Date(localStorage.getItem("token_exp") + new Date().getTime())) {
      this.Logout();
    }
    return localStorage.getItem("token_name")
  }

  public isAuth() {
    return !!this.Token;
  }

}
