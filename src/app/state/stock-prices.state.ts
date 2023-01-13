import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { StockDataModel, StockDataModelMap } from '../model/StockData.model';

export namespace StockPricesActions {
    export class Init {
        static readonly type = '[StockPricesActions] Init';
        constructor(public stocksIds: string[]) { }
    }

    export class Update {
        static readonly type = '[StockPricesActions] Update';
        constructor(public stocksItem: StockDataModel) { }
    }
}

export class StockPricesModel {
    public stocksData: StockDataModelMap;
}

const Defaults: StockPricesModel = {
    stocksData: {},
};

@State<StockPricesModel>({
    name: 'stockPrices',
    defaults: Defaults,
})
@Injectable()
export class StockPricesState {
    @Selector()
    public static stocksData(state: StockPricesModel): StockDataModelMap {
        return state.stocksData;
    }

    @Action(StockPricesActions.Init)
    init(ctx: StateContext<StockPricesModel>, { stocksIds }: StockPricesActions.Init) {
        const stocksData: StockDataModelMap = stocksIds.reduce((acc, item) => {
            acc[item] = {};
            return acc;
        }, {});
        ctx.setState({
            stocksData
        });
    }

    @Action(StockPricesActions.Update)
    update(ctx: StateContext<StockPricesModel>, { stocksItem }: StockPricesActions.Update) {
        const { stocksData } = ctx.getState();
        const oldStocksData = { ...stocksData[stocksItem.id] };
        stocksData[stocksItem.id] = {
            ...oldStocksData,
            ...stocksItem,
        };

        // Unfortunately Yahoo Finance Websocket returns this data irregularly
        if (!stocksData[stocksItem.id].dayhigh) {
            stocksData[stocksItem.id].dayhigh = oldStocksData.dayhigh;
        }

        if (!stocksData[stocksItem.id].daylow) {
            stocksData[stocksItem.id].daylow = oldStocksData.daylow;
        }

        ctx.patchState({ stocksData });
    }
}
