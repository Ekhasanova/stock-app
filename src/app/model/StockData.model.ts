import { PricingData } from "../service/proto/pricingData_pb";

export type StockDataModel = PricingData.AsObject;

export type StockDataModelMap = { [key: string]: StockDataModel };
