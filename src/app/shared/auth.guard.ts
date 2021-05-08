import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';
import {UtilsService} from '../utils.service';

@Injectable({providedIn:"root"})
export class AuthGuard  implements CanActivate, CanActivateChild{
  constructor(private auth: AuthService, private utils : UtilsService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean  {
    const auth = this.auth.isAuth()
    if (!auth) { this.utils.openSnackBar("Вы не авторизированы!","Ошибка доступа")}
    return auth;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean  {
    return this.canActivate(childRoute,state);
  }



}
