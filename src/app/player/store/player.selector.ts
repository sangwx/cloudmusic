import { createSelector } from "@ngrx/store";
import { PlayState } from "./player.reducer";

const selectPlayerState = (state:{player:PlayState}) => state.player; //需要操作的状态
export const getPlayer = createSelector(selectPlayerState,(state:PlayState)=> state.playing);
export const getPlayList = createSelector(selectPlayerState,(state:PlayState)=> state.playList);
export const getSongList = createSelector(selectPlayerState,(state:PlayState)=> state.songList);
export const getPlayMode = createSelector(selectPlayerState,(state:PlayState)=> state.playMode);
export const getCurrentSong = createSelector(selectPlayerState,(state:PlayState)=> state.playList[state.currentIndex]);
