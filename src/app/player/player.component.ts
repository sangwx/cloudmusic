import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlayState } from './store/player.reducer';
import { getCurrentSong, getPlayList, getPlayMode, getSongList } from './store/player.selector';
import { playMode, Song } from 'src/app/core/contant';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { SetCurrentIndex } from './store/player.action';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audio') audioRef!:ElementRef;
  audio!: HTMLAudioElement;
  songList$!: Observable<Song[]>;
  playList$!: Observable<Song[]>;
  currentSong$!: Observable<Song>;
  _currentSong!: Subscription
  playMode$!: Observable<playMode>;
  playing$!: Observable<Boolean>;
  songList: Song[] = [];
  playList: Song[] = [];
  currentSong!: Song
  playMode: playMode = { type:"loop",label:"循环"};
  playing: Boolean = false;
  hidden: Boolean = true;
  currentPer: number = 0;
  readyPer: number = 0;
  currentIndex: number = 0;


  constructor(private store$:Store<{player:PlayState}>) { 
    this.store$.pipe(select(getPlayMode)).subscribe(
      a=>console.log(a)
    )
  }
  ngAfterViewInit() {
    this.audio = this.audioRef.nativeElement;
    this.audio.volume = 0.5;
    this.audio.src = '';
    fromEvent(this.audio,'timeupdate').subscribe(
      e=>{
        this.currentPer = (this.audio.currentTime / this.audio.duration) * 100
        if(this.currentPer==100){
          // this.currentPer = 0;
          this.next()
        }
        if(this.audio.buffered.length){
          this.readyPer = (this.audio.buffered.end(0) / this.audio.duration) * 100;
          console.log('ready',this.readyPer);
        }
      }
    )
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
    this.songList$.subscribe(
      res=>this.songList = res
    )
    this.currentSong$.subscribe(res=>{
      console.log(res);
      this.currentSong = res;
      if(this.playing&&this.currentSong.url&&(this.audio.src!=this.currentSong.url)){
        this.playing = false;
        this.currentPer = 0
        this.readyPer = 0
        this.play();
      }
    });
  }

  play(){
    // console.log('Player Clicking',this.audio.src);
    if(this.playing==false&&this.currentSong?.url){
      // if(this.currentSong.url){
        if(this.audio.src!=this.currentSong.url){
          this.audio.setAttribute("src",this.currentSong.url);
          // console.log(this.audio);  
          this.audio.play();
          this.playing = true;
        }else{
          this.audio.play()
          this.playing = true;
        }
      // }else{
      //   this.audio.setAttribute("src",'');
      //   console.log("No Song");
      //   // this.audio.pause();
      //   // this.playing = false;
      //   this.next()
      // }
    }else{
      this.audio.pause();
      this.playing = false;
    }
  }

  next(){
    this.currentPer = 0
    this.readyPer = 0
    this.currentIndex += 1;
    if(this.songList.length-1<this.currentIndex) this.currentIndex = 0
    this.store$.dispatch(SetCurrentIndex({currentIndex:this.currentIndex}))
    this.playing=false
    this.play()
  }

  pre(){
    this.currentPer = 0
    this.readyPer = 0
    this.currentIndex -= 1;
    if(0>this.currentIndex) this.currentIndex = 0
    this.store$.dispatch(SetCurrentIndex({currentIndex:this.currentIndex}))
    this.playing=false
    this.play()
  }

  hiddenVolumn(){
    this.hidden = !this.hidden
  }

  ChangeVolumn(vol:number){
    console.log(vol);
    this.audio.volume = vol
  }

  ChangeCur(cur:number){
    this.audio.currentTime = this.audio.duration * cur
    console.log(this.audio.currentTime);
  }

}
