import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    if(value){
      const minutes: number = Math.floor(value / 60);
      return minutes.toFixed(0) + ':' + ((value - minutes * 60)<9.5?"0"+(value - minutes * 60).toFixed(0):(value - minutes * 60).toFixed(0))
    }
    else{
      return '00:00'
    }
    
 }

}
