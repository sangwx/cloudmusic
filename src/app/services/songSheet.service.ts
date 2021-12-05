import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { api } from 'src/environments/environment';
import { Song, SongSheet } from '../core/contant';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class SongSheetService {

  constructor(
    private http:HttpClient,
    private songService: SongService
  ) { }

  getSongSheetDetail(id:number): Observable<SongSheet>|any {
    const params = new HttpParams().set('id',id.toString())
    console.log(params);
    return this.http.get(api.playList,{params}).pipe(
      map((res:{playlist: SongSheet}|any)=> res.playlist)
    )
  }
  
  GetPlaySheetwUrl(id:number): Observable<Song[]>|any{
    return this.getSongSheetDetail(id).pipe(
      pluck('tracks'),
      // tap(data=>console.log("tracks",data)),
      switchMap((tracks:Song[])=>this.songService.getSongList(tracks))
    )
  }
}
