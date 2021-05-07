import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// interfaces
import { Datum } from './models/messari-api.interface';
import { AssetProfileV2Params, AssetsV2Params } from './models/messari-query-params.interface';
import { AssetProfileV2 } from './models/messari-api.profile.interface';

const MESSARI_HOST: string = 'https://data.messari.io/';
const MESSARI_API: string = 'api/v2/';
const API_KEY: string = '50cc2051-2d44-49da-bd80-038e25cabb45';

@Injectable()
export class MessariApiService {

    constructor(
        private httpClient: HttpClient
    )
    { }

    // https://messari.io/api/docs#operation/Get%20all%20Assets%20V2
    /**
 * Options used to construct an `HttpParams` instance.
 *
 * @publicApi
 */
    getAssetsV2(params?: AssetsV2Params): Observable<Datum[]> {

        let httpParams: HttpParams | undefined;

        if(params) {
            const options = new Map<string, string>();
            let stringValues: string = '';

            for(const [key, value] of Object.entries(params)) {
                if(value){

                    if (key === 'withMetrics') {
                        options.set('with-metrics',value);
                    } else if (key === 'withProfiles') {
                        options.set('with-profiles',value);
                    } else {
                        options.set(key,value);
                    }
                }
            }

            const paramOptions: HttpParamsOptions = {
                fromObject: Object.fromEntries(options),
            }

            httpParams = new HttpParams(paramOptions);
        }

        return this.get('assets', httpParams).pipe( 
            map( (result) => {
                return result.data;
            })  
        );
    }

    getAssetProfileV2(assetKey?: string, httpParams?: HttpParams): Observable<AssetProfileV2> {
        return this.get(`assets/${assetKey}/profile`, httpParams).pipe( 
            map( (result: AssetProfileV2) => {
                return result;
            })  
        );
    }

    getAssetMarketData(assetKey?: string, httpParams?: HttpParams) {

    }

    private get(endpoint: string, params?: HttpParams): Observable<any> {

        const headers = new HttpHeaders({
            'x-messari-api-key': API_KEY
        });

        const options = {
            headers: headers,
            params: params
        };

        return this.httpClient.get(`${MESSARI_HOST}${MESSARI_API}${endpoint}`, options);
    }
}

// Header
// x-messari-api-key