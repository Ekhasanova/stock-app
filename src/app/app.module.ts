import { StockPricesState } from './state/stock-prices.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { StockPricesComponent } from './components/stock-prices/stock-prices.component';
import { StockPricesItemComponent } from './components/stock-prices-item/stock-prices-item.component';
import { NormalizePipe } from './pipe/normalize.pipe';
import { PricePipe } from './pipe/price.pipe';
import { PercentPipe } from './pipe/percent.pipe';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StockPricesComponent,
    StockPricesItemComponent,
    NormalizePipe,
    PricePipe,
    PercentPipe,
    ToggleSwitchComponent,
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([StockPricesState]),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
