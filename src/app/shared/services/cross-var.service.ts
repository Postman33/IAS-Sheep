import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrossVarService {
  public triggerState$ : Subject<any> = new Subject<any>();
  constructor() { }
}
