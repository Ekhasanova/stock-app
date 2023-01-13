import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { StockPricesService } from 'src/app/service/stock-prices.service';
import { Observable } from 'rxjs';
import { StockDataModel } from 'src/app/model/StockData.model';

@Component({
  selector: 'app-stock-prices-item',
  templateUrl: './stock-prices-item.component.html',
  styleUrls: ['./stock-prices-item.component.scss'],
  host: { 'class': 'stockPricesItem' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockPricesItemComponent {
  @Input() name: string;
  @Input() set data(val: StockDataModel) {
    this.stocksData = val;
    this.negativeGrowth = val.changepercent < 0;
  }

  @HostBinding('class.stockPricesItem--unsubscribed')
  public unsubscribed = false;

  @HostBinding('class.stockPricesItem--negativeGrowth')
  public negativeGrowth = false;

  stocksData: StockDataModel;
  stocksData$: Observable<StockDataModel>;

  constructor(
    private service: StockPricesService,
  ) { }

  toggle(val: boolean): void {
    this.unsubscribed = !val;
    if (val) {
      this.service.subscribeToPriceUpdates(this.name);
    } else {
      this.service.unsubscribeFromPriceUpdates(this.name);
    }
  }
}
