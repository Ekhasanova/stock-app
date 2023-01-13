import { StockDataModel } from './../../model/StockData.model';
import { StockPricesState } from './../../state/stock-prices.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StockPricesService } from 'src/app/service/stock-prices.service';
import { Select } from '@ngxs/store'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-prices',
  templateUrl: './stock-prices.component.html',
  styleUrls: ['./stock-prices.component.scss']
})
export class StockPricesComponent implements OnInit, OnDestroy {
  stockNames: string[] = ['AAPL', 'GOOG', 'MSFT', 'TSLA'];

  @Select(StockPricesState.stocksData) stocksData$: Observable<Record<string, StockDataModel>>;

  constructor(
    private stockPricesService: StockPricesService
  ) { }

  ngOnInit(): void {
    this.stockPricesService.init(this.stockNames);
  }

  ngOnDestroy(): void {
    this.stockPricesService.destroy();
  }
}
