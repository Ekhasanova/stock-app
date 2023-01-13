import { Injectable } from '@angular/core';
import { PricingData } from './proto/pricingData_pb';
import { Store } from '@ngxs/store';
import { StockPricesActions } from '../state/stock-prices.state';

@Injectable({
    providedIn: 'root'
})
export class StockPricesService {
    private socket: WebSocket;

    constructor(private store: Store) { }

    public init(stockSymbols: string[]): void {
        this.store.dispatch(new StockPricesActions.Init(stockSymbols));
        this.socket = new WebSocket('wss://streamer.finance.yahoo.com/');
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({ subscribe: stockSymbols }));
        }
        this.socket.onmessage = (event) => {
            const pricingData = PricingData.deserializeBinary(event.data);
            const pricingDataObj = pricingData.toObject();
            this.store.dispatch(new StockPricesActions.Update(pricingDataObj))
        };
    }

    public subscribeToPriceUpdates(stockSymbol: string): void {
        this.socket.send(JSON.stringify({ subscribe: [stockSymbol] }));
    }

    public unsubscribeFromPriceUpdates(stockSymbol: string): void {
        this.socket.send(JSON.stringify({ unsubscribe: [stockSymbol] }));
    }

    public setOnMessageCallback(callback: (event: MessageEvent) => void): void {
        this.socket.onmessage = callback;
    }

    public destroy(): void {
        this.socket.close();
    }
}
