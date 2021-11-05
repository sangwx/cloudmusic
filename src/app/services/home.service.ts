import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { api } from 'src/environments/environment';

export type Banner = {
  id: number;
  url: string;
  imageUrl: string;
}

export type HotTag = {
  id: number;
  name: string;
  position: number;
}

export type Personalized={
  id: number,
  name: string,
  picUrl: string,
  playCount: number
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

  getHotTags(): Observable<HotTag[]|undefined>{ //获取Hot标签图片
    return this.http.get(api.hot).pipe(
      map(
        (res:{tags?:HotTag[]})=>{
          // return res.tags
          return res.tags?.map(value=>{
            return {
              id: value.id,
              name: value.name,
              position: value.position
            }
          })
        }
      )
    )
  }


  getPersonalized(): Observable<Personalized[]|undefined>{ //获取Hot标签图片
    return this.http.get(api.personalized).pipe(
      map(
        (res:{result?:Personalized[]})=>{
          // return res.result //不会根据type过滤对象
          return res.result?.map(value=>{
            return {
              id: value.id,
              name: value.name,
              picUrl: value.picUrl,
              playCount: value.playCount
            }
          })
        }
      )
    )
  }
}