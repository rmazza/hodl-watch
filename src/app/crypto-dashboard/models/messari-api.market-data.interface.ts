import { Status } from "./messari-api.interface";

export interface AssetMarketData {
    status?: Status;
    data?:   Data;
}

export interface Data {
    id:                      string;
    symbol?:                  string;
    name?:                    string;
    slug?:                    string;
}