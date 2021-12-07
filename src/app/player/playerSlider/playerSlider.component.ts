import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { filter, fromEvent, Observable, pluck, Subscription, switchMap, switchMapTo, tap } from 'rxjs';

export type sliderStyle = {
  width?: string|null,
  height?: string|null,
  left?: string|null,
  right?: string|null,
  top?:string|null,
  "margin-bottom"?: string|null
  "margin-left"?:string|null
}

@Component({
  selector: 'app-playerSlider',
  templateUrl: './playerSlider.component.html',
  styleUrls: ['./playerSlider.component.scss']
})
export class PlayerSliderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vertical: boolean = false;
  @Input() curPercent: number = 0;
  @Input() rdyPercent: number = 0;
  @Output() Vol = new EventEmitter<number>();
  @Output() Cur = new EventEmitter<number>();
  @ViewChild('btn' ) btn!: ElementRef
  @ViewChild('barbg' ) barbg!: ElementRef
  curStyle: sliderStyle ={};
  rdyStyle: sliderStyle = {};
  btnStyle: sliderStyle = {};
  mousedown$!: Observable<any>
  mouseup$!: Observable<Event>
  mousemove$!: Observable<Number>
  mouseup_!:Subscription;
  mousedown_!:Subscription;
  mousemove_!:Subscription;
  mouseDown: boolean =false;
  mousemoved: boolean = false;
  vol: number = 0.5
  cur: number = 0

  constructor(
  ) { 
  }

  ngOnDestroy() {
    this.mouseup_.unsubscribe();
    this.mousedown_.unsubscribe();
    this.mousemove_.unsubscribe();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.BtnControl()
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.vertical&&!this.mousemoved) {
      this.curStyle.width = this.curPercent.toFixed(2) + '%';
      this.btnStyle["left"] = 4.93*Number(this.curPercent) +'px';
      this.rdyStyle.width = this.rdyPercent.toFixed(2) + '%';
    }
    this.setRdyBarLength()
  }

  getBarPosition(){
    let r = this.barbg.nativeElement.getBoundingClientRect();
    return r
  }

  setBarLength(vertical:boolean,barInfo:{top:number,bottom:number,left:number,right:number,height:number,width:number},mouseXorYValue:number){
    let per = (vertical==false)?((mouseXorYValue-barInfo.left) / barInfo.width * 100):((barInfo.bottom - mouseXorYValue) / barInfo.height * 100);
    per = per>100?100:per;
    per = per <0?0:per;
    console.log(per);
    vertical? (this.vol=per/100):(this.cur=per/100);
    this.curStyle.width = (vertical==false)? (per + "%") : '100%';
    this.curStyle.height = (vertical==true)? (per + "%") : '100%';
    this.Vol.emit(this.vol)
    // this.Cur.emit(this.cur)
    this.setBtnPosition();
  }

  setBtnPosition(){
  // (vertical:boolean,mouseXY:number,r:{top:number,bottom:number,left:number,right:number,height:number,width:number}){
    if(this.vertical){
      let len = this.cur * 75;
      len = len>75?75:len
      len = len<0?0:len
      this.btnStyle["margin-bottom"] = len+'px'
    }else{
      // let len = mouseXY- r.left
      let len = this.cur * 493;
      len = len>493?493:len
      len = len<0?0:len
      this.btnStyle["left"] = len +'px'
    }
  }

  BtnControl(){
    this.mouseup$ = fromEvent(document,'mouseup').pipe(
      tap(e=>this.mouseDown=false),
      tap(e=>{if(this.mousemoved){this.Cur.emit(this.cur);this.mousemoved = false}})
    )
    this.mousedown$ = fromEvent<any>(this.barbg.nativeElement,'mousedown').pipe(
      tap(
        e=>{
          this.mouseDown=true;
          this.mousemoved = true;
      }),
      pluck(this.vertical?'y':'x'),
      tap(e=>{
        const r = this.getBarPosition();
        this.setBarLength(this.vertical,r,e);
        // this.setBtnPosition(this.vertical,e,r);
      })
    )
    this.mousemove$ = fromEvent<any>(document,'mousemove').pipe(
      tap((e:any)=>{
        e.stopPropagation();
        e.preventDefault();
      }),
      filter((e)=>this.mouseDown === true),
      pluck(this.vertical?'clientY':'clientX'),
      tap((e:number)=>{
        const r = this.getBarPosition();
        this.setBarLength(this.vertical,r,e);
        // this.setBtnPosition();
        // this.setBtnPosition(this.vertical,e,r);
      })
    )

    this.mousedown_ = this.mousedown$.subscribe()
    this.mousemove_ = this.mousemove$.subscribe()
    this.mouseup_ = this.mouseup$.subscribe()

  }

  setRdyBarLength(){
    if(this.vertical==false){
      this.rdyStyle.width = this.rdyPercent + "%"
    }
  }

}
