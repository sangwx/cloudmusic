import { Component, OnInit, ViewChild } from '@angular/core';
// import { NzCalendarComponent } from 'ng-zorro-antd/calendar';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Banner, HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banners:Banner[]|undefined;
  // @ViewChild(NzCarouselComponent) private carousel:any;
  @ViewChild('NzCarouselComponent') private carousel:any;
  constructor(
    private homeService:HomeService,
  ){}

  next(){
    this.carousel.next()
  }
  pre(){
    this.carousel.pre()
  }

  ngOnInit() {
    this.homeService.getBanner().subscribe(
      (data:Banner[]|undefined)=>{
        console.log(data);
        this.banners=data
        console.log(this.banners);
      }
    )
  }

}
