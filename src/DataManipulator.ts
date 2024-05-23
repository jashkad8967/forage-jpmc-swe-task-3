import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  upper_bound: number,
  lower_bound: number,
  ratio: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
    const priceABC = (ServerRespond[0].top_ask.price + ServerRespond[0].top_bid.price)/2;
    const priceDEF = (ServerRespond[1].top_ask.price + ServerRespond[1].top_bid.price)/2;
    const ratio = price_abc/price_def;
    const upperBound = 1.05;
    const lowerBound = 0.95;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio: ratio,
      timestamp: ServerRespond[0].timestamp > ServerRespond[1].timestamp ?
        ServerRespond[0].timestamp : ServerRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}
