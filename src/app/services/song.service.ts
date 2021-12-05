import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { api } from 'src/environments/environment';
import { Song, SongUrl } from '../core/contant';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  
  constructor(
    private http:HttpClient
  ) { }

  getSongUrl(id:string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id',id.toString())
    return this.http.get(api.songUrl,{params}).pipe(
      map((res:{data: SongUrl[]}|any) => res.data)
    )
  }

  getSongList(Songs:Song[]):Observable<Song[]>|any{  //添加url到Song
    const ids = Songs.map(item=>item.id).join(',');
    return this.getSongUrl(ids).pipe(
      map((res:SongUrl[])=>{
        const songs = Songs.map(t1 => ({...t1, ...res.find((t2:SongUrl) => t2.id === t1.id)}))
        return songs
      })
    )
  }

}
