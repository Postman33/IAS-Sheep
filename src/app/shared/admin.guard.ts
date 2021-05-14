import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UtilsService} from '../utils.service';
import {AuthService} from "./services/auth.service";

@Injectable({providedIn:"root"})
export class AdminGuard  implements CanActivate, CanActivateChild, CanLoad{
  constructor(private http: HttpClient, private utils : UtilsService, private auth : AuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean > | boolean  {

    return  this.auth.isAdmin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean  {
    return this.canActivate(childRoute,state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean > | boolean  {
    return this.auth.isAdmin();

  }



}
