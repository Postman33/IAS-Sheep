import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  public getCollection<T>( url : string): Observable<T[]> {

      return this.http.get(url).pipe(map(res => {
        let result: T[] = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            const obj = res[key];
            let {_id, ...rest} = obj;
            result.push({
              id: obj._id,
              ...rest
            });
          }
        }
        return result;
      }))
}

}
