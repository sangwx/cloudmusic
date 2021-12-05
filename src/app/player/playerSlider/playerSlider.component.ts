import { NgStyle } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { distinct, distinctUntilChanged, filter, fromEvent, map, Observable, Observer, pluck, Subject, Subscriber, Subscription, switchMap, switchMapTo, take, takeUntil, takeWhile, tap } from 'rxjs';

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
    this.setRdyBarLength()
  }

  getBarPosition(){
    let r = this.barbg.nativeElement.getBoundingClientRect();
    // console.log(r);
    return r
  }

  setBarLength(vertical:boolean,barInfo:{top:number,bottom:number,left:number,right:number,height:number,width:number},mouseXorYValue:number){
    
    let per = (vertical==false)?((mouseXorYValue-barInfo.left) / barInfo.width * 100):((barInfo.bottom - mouseXorYValue) / barInfo.height * 100)
    per = per>100?100:per
    per = per <0?0:per
    // console.log(per);
    this.curStyle.width = (vertical==false)? (per + "%") : '100%'
    this.curStyle.height = (vertical==true)? (per + "%") : '100%'
  }

  setBtnPosition(vertical:boolean,mouseXY:number,r:{top:number,bottom:number,left:number,right:number,height:number,width:number}){
    if(vertical){
      let len = r.bottom - mouseXY -7
      len = len>75?75:len
      len = len<-7?-7:len
      this.btnStyle["margin-bottom"] = len+'px'
    }else{
      let len = mouseXY- r.left -7
      len = len>484?484:len
      len = len<-7?-7:len
      this.btnStyle["margin-left"] = len +'px'
    }
  }

  BtnControl(){
    this.mouseup$ = fromEvent(document,'mouseup').pipe(
      // tap(e=>console.log('mouseup')),
      tap(e=>this.mouseDown=false)
    )
    this.mousedown$ = fromEvent<any>(this.barbg.nativeElement,'mousedown').pipe(
      tap(
        e=>{
          // console.log('mousedown');
          this.mouseDown=true;
      }),
      pluck(this.vertical?'y':'x'),
      tap(e=>{
        const r = this.getBarPosition();
        this.setBtnPosition(this.vertical,e,r);
        this.setBarLength(this.vertical,r,e);
      })
    )
    this.mousemove$ = fromEvent<any>(document,'mousemove').pipe(
      // tap(e=>console.log(e)),
      filter((e)=>this.mouseDown === true),
      // pluck(this.vertical?'pageY':'pageX'),
      pluck(this.vertical?'clientY':'clientX'),
      // tap(e=>console.log('mousemove')),
      tap((e:number)=>{
        const r = this.getBarPosition();
        this.setBtnPosition(this.vertical,e,r);
        this.setBarLength(this.vertical,r,e);
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
