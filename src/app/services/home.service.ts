import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { api } from 'src/environments/environment';

export type Banner = {
  id: number;
  url: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getBanner(): Observable<Banner[]|undefined> {
    return this.http.get(api.banner).pipe(
      map((res:{ banners?: Banner[]}) => res.banners)
    ) 
  }

}