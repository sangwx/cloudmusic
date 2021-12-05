import { Component, OnInit, ViewChild } from '@angular/core';
// import { NzCalendarComponent } from 'ng-zorro-antd/calendar';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Banner, HomeService, HotTag, Personalized } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  banners:Banner[]|undefined;
  hotTags: HotTag[]|undefined;
  personalized: Personalized[]|undefined;

  // @ViewChild(NzCarouselComponent) private carousel:any;
  @ViewChild('NzCarouselComponent') private carousel:any;
  constructor(
    private homeService:HomeService,
  ){}

  next(){this.carousel.next()}
  pre(){this.carousel.pre()}

  ngOnInit() {
    this.homeService.getBanner().subscribe((data:Banner[]|undefined)=>{this.banners=data});
    this.homeService.getHotTags().subscribe(data => {
      this.hotTags=data?.sort((x:HotTag,y:HotTag)=>x.position-y.position).slice(0,5)
      // console.log(this.hotTags);
    })
    this.homeService.getPersonalized().subscribe(data => {
      this.personalized=data;
      // console.log(this.personalized);
    })
    
  }

}
