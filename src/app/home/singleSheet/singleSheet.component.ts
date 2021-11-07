import { Component, Input, OnInit } from '@angular/core';
import { Personalized } from 'src/app/services/home.service';

@Component({
  selector: 'app-singleSheet',
  templateUrl: './singleSheet.component.html',
  styleUrls: ['./singleSheet.component.scss']
})
export class SingleSheetComponent implements OnInit {
  @Input() personalized: any

  constructor() {
  }

  ngOnInit() {
  }
  
  ngOnChanges(){
    // console.log(this.personalized,123123123);
  }
}
