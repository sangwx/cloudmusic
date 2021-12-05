import { createReducer, on } from "@ngrx/store";
import { playMode, Song } from "src/app/core/contant";
import { SetCurrentIndex, SetPlaying, SetPlayList, SetPlayMode, SetSongList } from "./player.action";

// export type playMode = {
//     type: 'loop'  | 'random' | 'singleLoop',
//     label: '循环' | "随机" | "单曲循环"
// };

// export type Singer = {
//     id: number;
//     name: string;
//     picUrl: string;
//     albumSize: number;
//   }

// export type Song = {
//     id: number;
//     name: string;
//     url: string;
//     ar: Singer[];
//     al: { id: number; name: string; picUrl: string };
//     dt: number;
//   }

export type PlayState = {
    playing: boolean;
    playMode: playMode;
    songList: Song[];
    playList: Song[];
    currentIndex: number;
}

export const initalState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: {type:'loop',label:'循环'},
  currentIndex: -1
}

export const playerReducer = createReducer(  //reducer是一个函数接收(state,action)
  initalState,
  on(SetPlaying,(state,{playing})=>({...state,playing})),
  on(SetPlayList,(state,{playList})=>({...state,playList})),
  on(SetSongList,(state,{songList})=>({...state,songList})),
  on(SetPlayMode,(state,{playMode})=>({...state,playMode})),
  on(SetCurrentIndex,(state,{currentIndex})=>({...state,currentIndex}))
)