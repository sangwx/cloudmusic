import { NgStyle } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { distinct, distinctUntilChanged, fromEvent, map, Observable, Observer, pluck, Subscriber, Subscription, take, takeUntil, takeWhile, tap } from 'rxjs';

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
export class PlayerSliderComponent implements OnInit, OnChanges {
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
  mouseup_:any=null;
  mousedown_:any=null;
  mousemove_:any=null;

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  cleareSbscribe(){
    if(this.mouseup_ instanceof Subscription){
      this.mouseup_.unsubscribe();
      this.mouseup_ = null;
    };
    // if(this.mousedown_ instanceof Subscription){
    //   this.mousedown_.unsubscribe();
    //   this.mousedown_ = null;
    // };
    if(this.mousemove_ instanceof Subscription){
      this.mousemove_.unsubscribe();
      this.mousemove_ = null;
    };
  }

  getBarPosition(){
    let r = this.barbg.nativeElement.getBoundingClientRect();
    console.log(r);
    return r
  }

  setBarLength(vertical:boolean,barInfo:{top:number,bottom:number,left:number,right:number,height:number,width:number},mouseXorYValue:number){
    if(vertical==false){
      let per = (mouseXorYValue-barInfo.left) / barInfo.width * 100;
      per = per>100?100:per
      per = per <0?0:per
      // console.log(per);
      this.curStyle.width = per + "%"
    }else{
      let per = (barInfo.bottom - mouseXorYValue) / barInfo.height * 100
      per = per>100?100:per
      per = per <0?0:per
      // console.log(per);
      this.curStyle.height = per + "%"
    }
  }

  setBtnPosition(vertical:boolean,mouseXY:number,r:{top:number,bottom:number,left:number,right:number,height:number,width:number}){
    if(vertical){
      let len = r.bottom - mouseXY -7
      len = len>80?80:len
      len = len<-7?-7:len
      this.btnStyle["margin-bottom"] = len+'px'
    }else{
      let len = mouseXY- r.left -7
      len = len>486?486:len
      len = len<-7?-7:len
      this.btnStyle["margin-left"] = len +'px'
    }
  }

  moveBtn(){
    this.cleareSbscribe();
    const r = this.getBarPosition();
    this.mouseup$ = fromEvent(document,'mouseup')
    this.mousedown$ = fromEvent<any>(this.barbg.nativeElement,'mousedown').pipe(
      tap(e=>console.log('down')),
      pluck<any>(this.vertical?'y':'x')
    )
    // this.mousemove$ = fromEvent<any>(this.btn.nativeElement,'mousemove').pipe(
    this.mousemove$ = fromEvent<any>(document,'mousemove').pipe(
      tap((e:any)=>{
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<any>(this.vertical?'pageY':'pageX'),
      distinctUntilChanged(),
      map((position:any)=>position),
      takeUntil(this.mouseup$)
    )

    this.mousedown_ = this.mousedown$.subscribe(
      (e:number)=>{
        this.setBtnPosition(this.vertical,e,r)
        this.mouseup_ = this.mouseup$.subscribe(a=>{console.log("up");this.cleareSbscribe();})
        this.mousemove_ = this.mousemove$.subscribe(
          (mouseXY:any)=>{
            this.setBtnPosition(this.vertical,mouseXY,r)
            this.setBarLength(this.vertical,r,mouseXY);
            // if(this.vertical){
            //   this.btnStyle["margin-bottom"] = r.bottom - mouseXY -7+'px'
            //   this.setBarLength(this.vertical,r,mouseXY);
            // }else{
            //   this.btnStyle["margin-left"] = mouseXY-r.left-7 +'px'
            //   this.setBarLength(this.vertical,r,mouseXY);
            // }
          }
        )
      }
    )
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.moveBtn()
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // if(this.vertical == false){
    //   if(changes["curPercent"]){
    //     this.curStyle = {
    //       width:  this.curPercent + "%"
    //     }
    //   }
    //   if(changes["rdyPercent"]){
    //     this.rdyStyle = {
    //       width:  this.rdyPercent + "%"
    //     }
    //   }
    // }
    // else if(this.vertical == true){
    //   if(changes["curPercent"]){
    //     this.curStyle = {
    //       height:  this.curPercent + "%"
    //     }
    //   }
    // }
    // else{
    //   throw new Error('Method not implemented.');
    // }
  }
}
