import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Song } from 'src/app/core/contant';
import { SetCurrentIndex, SetPlayList, SetSongList } from 'src/app/player/store/player.action';
import { PlayState } from 'src/app/player/store/player.reducer';
import { SongSheetService } from 'src/app/services/songSheet.service';

@Component({
  selector: 'app-singleSheet',
  templateUrl: './singleSheet.component.html',
  styleUrls: ['./singleSheet.component.scss']
})
export class SingleSheetComponent implements OnInit {
  @Input() personalized: any

  constructor(
    private songSheetService:SongSheetService,
    private store$:Store<{player:PlayState}>
  ) {
  }

  ngOnInit() {
  }
  
  ngOnChanges(){
    // console.log(this.personalized,123123123);
  }

  getSongSheetDetail(){
    this.songSheetService.GetPlaySheetwUrl(this.personalized.id)
      .subscribe((data:Song[])=>
        {
          this.store$.dispatch(SetSongList({songList:data}));
          this.store$.dispatch(SetPlayList({playList:data}));
          this.store$.dispatch(SetCurrentIndex({currentIndex:0}));
        }
      );
  }

}
