import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoaderService{


  constructor(private http : HttpClient) { }


  private preloadData( url : string, body ) {
   return this.http.post('/api/reports/'+url , body).toPromise();
  }

  public async preload(url: string , body){
    return await this.preloadData(url, body);
  }

}
