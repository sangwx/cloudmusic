import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlayState } from './store/player.reducer';
import { getCurrentSong, getPlayList, getPlayMode, getSongList } from './store/player.selector';
import { playMode, Song } from 'src/app/core/contant';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audio') aduioRef!:ElementRef;
  audio!: HTMLAudioElement;
  songList$!: Observable<Song[]>;
  playList$!: Observable<Song[]>;
  currentSong$!: Observable<Song>;
  playMode$!: Observable<playMode>;
  playing$!: Observable<Boolean>;
  songList: Song[] = [];
  playList: Song[] = [];
  currentSong!: Song
  playMode: playMode = { type:"loop",label:"循环"};
  playing: Boolean = false;
  hidden: Boolean = true;


  constructor(private store$:Store<{player:PlayState}>) { 
    this.store$.pipe(select(getPlayMode)).subscribe(
      a=>console.log(a)
    )
  }
  ngAfterViewInit() {
    this.audio = this.aduioRef.nativeElement;
  }

  ngOnInit() {
    this.songList$ = this.store$.select(getSongList)
    this.playList$ = this.store$.select(getPlayList)
    this.currentSong$ = this.store$.select(getCurrentSong)
    this.playMode$ = this.store$.select(getPlayMode)
    this.playList$.subscribe(res=>console.log(res))
    this.loadSong();
  }

  loadSong(){
    this.currentSong$.subscribe(res=>{
      console.log(res);
      this.currentSong = res
    });
  }

  play(){
    this.playing = !this.playing
    if(this.playing){
      this.currentSong$.subscribe(res=>{
        this.currentSong = res
        if(this.currentSong.url&&this.playing){
          this.audio.setAttribute("src",this.currentSong.url);
          console.log(this.audio);  
          this.audio.play();
        }else if(!this.currentSong.url) {
          console.log("无歌曲");
        }
      });
    }else{
      this.audio.pause()
    }

  }

  hiddenVolumn(){
    this.hidden = !this.hidden
  }

}
