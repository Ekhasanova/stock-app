import { Pipe, PipeTransform } from '@angular/core';
import { NormalizePipe } from './normalize.pipe';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {
  private normPipe = new NormalizePipe();

  transform(value: any): string {
    if (!value) return '--';

    return `${this.normPipe.transform(value)}%`;
  }


}
