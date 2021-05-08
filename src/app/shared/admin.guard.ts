import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UtilsService} from '../utils.service';

@Injectable({providedIn:"root"})
export class AdminGuard  implements CanActivate, CanActivateChild, CanLoad{
  constructor(private http: HttpClient, private utils : UtilsService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean  {
    return this.http.get<boolean>("/api/auth/isAdmin").pipe(
      tap( result => {
        if (!result){   this.utils.openSnackBar("Вы не являетесь администратором для совершения этого действия!","Ошибка доступа")}
      })
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean  {
    return this.canActivate(childRoute,state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean > | boolean  {
     return this.http.get<boolean>("/api/auth/isAdmin").pipe(
      tap( result => {
        if (!result){   this.utils.openSnackBar("Вы не являетесь администратором для совершения этого действия!","Ошибка доступа")}
      })
    );
  }



}
