import {Injectable} from '@angular/core';
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

  }

  error$: Subject<any> = new Subject<any>();

  private observableIsAdmin(): Observable<boolean> {
    if ((new Date()) > new Date(localStorage.getItem("isAdminExp"))) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isAdminExp")
    }
    if (localStorage.getItem("isAdmin")) {
      return of(Boolean(localStorage.getItem("isAdmin") == 'true'))
    }
    return this.http.get<boolean>("/api/auth/isAdmin").pipe(tap(
      (isAdmin: boolean) => {
        localStorage.setItem("isAdmin", String(isAdmin));
        localStorage.setItem("isAdminExp", String(new Date(new Date().getTime() + 1000 * 60 * 60)))
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

  public get isAdminSimple() {
    return localStorage.getItem("isAdmin") == "true";
  }

  private catch(er: HttpErrorResponse) {
    this.error$.next(er.error.error)
    return throwError(er);
  }

  public Register(user: User) {
    //this.error$.next("")
    return this.registerFn(user).pipe(
      catchError(this.catch.bind(this))
    )

  }

  public Logout() {
    localStorage.removeItem("token_name")
    localStorage.removeItem("token_exp")
    this.router.navigate(["/"])

  }

  Login(user: User) {
    //this.error$.next("Test")
    return this.loginFn(user).pipe(
      catchError(this.catch.bind(this))
    )

  }

  loginFn(user: User) {
    return this.http.post<AuthResponse>(`/api/auth/login`, user)
  }
  registerFn(user: User) {
    return this.http.post<AuthResponse>("/api/auth/register", user)
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
