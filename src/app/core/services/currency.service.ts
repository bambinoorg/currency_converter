import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient : HttpClient) { }

  public getExchangeRates(baseCurrency: string): Observable<any>  {
    return this.httpClient.get<any>(`https://api.exchangerate.host/latest?base=${baseCurrency}&&symbols=UAH,EUR,USD,GBP,CNY`  );
  }

  public getPrivat(): Observable<any>  {
    return this.httpClient.get<any>(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5` );
  }


}
