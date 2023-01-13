import { NormalizePipe } from './normalize.pipe';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  private normPipe = new NormalizePipe();

  transform(value: any): string {
    if (!value) return '--';

    return `$${this.normPipe.transform(value)}`;
  }

}
