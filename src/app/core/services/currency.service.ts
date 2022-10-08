import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Currency} from "../interfaces/currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currency: Currency[] = [];

  public settings = {
    url: "https://currencydatafeed.com/api/data.php?currency=EUR/USD+USD",
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: "Bearer nttqgffc6664my6yy73v"
    },
  };

  constructor(private httpClient : HttpClient) { }


  public getExchangeRates(): Observable<any> {

    return this.httpClient.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

  }

}
