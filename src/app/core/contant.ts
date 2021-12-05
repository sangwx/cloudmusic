export type playMode = {
    type: 'loop'  | 'random' | 'singleLoop',
    label: '循环' | "随机" | "单曲循环"
};

export type Singer = {
    id: number;
    name: string;
    picUrl: string;
    albumSize: number;
  }

export type Song = {
    id: number;
    name: string;
    url: string;
    ar: Singer[]; //aritist info
    al: { id: number; name: string; picUrl: string };  //album info
    dt: number;  //song duration time
  }

export type SongUrl = {
  id: number;
  url: string;
}

export type SongSheet = {
  id:number;
  name:string;
  picUrl:string;
  playCount:number;
  tracks:Song[]
}