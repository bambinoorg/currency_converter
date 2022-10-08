import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Currency} from "../../interfaces/currency";
import {FormControl} from "@angular/forms";

//I didn't find a good free currency API and used PB and some math :)

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent implements OnInit {

  public currencyArr: Currency[] = [];
  public currencyTypeFirst: FormControl = new FormControl<string>('UAH');
  public currencyTypeSecond: FormControl = new FormControl<string>('USD');
  public currencyValueFirst: FormControl = new FormControl<number>(1);
  public currencyValueSecond: FormControl = new FormControl<number>(this.currencyValueFirst);
  public result!: number;
  public result2!: number;
  public firstValue!: number
  public secondValue!: number

  constructor(
    private currencyService: CurrencyService,
    private cdr: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe((resp) => {
      this.currencyArr = resp.map((el: Currency) => {
        return {
          ...el,
          buy: el.buy.slice(0, 5),
          sale: el.sale.slice(0, 5),
        }
      }).filter((el: Currency) => el.base_ccy !== 'USD');
      this.cdr.detectChanges();
    });
  }

  public selectUAH1(): void {
    this.exchangeFirst();
  }
  public selectUAH2(): void {
    this.exchangeSecond();
  }

  public input(firstValue: number): void {
    this.firstValue = firstValue;
    this.exchangeFirst();
  }

  public input2(secondValue: number) {
    this.secondValue = secondValue;
    this.exchangeSecond();
  }

  public exchangeFirst(): void {
    const exchange = +this.currencyArr[1].buy / +this.currencyArr[0].buy;

      if (this.currencyTypeFirst.value === 'UAH' && this.currencyTypeSecond.value === 'UAH') {
        this.result2 = this.firstValue;
      } else if (this.currencyTypeFirst.value === 'UAH') {
        const res = this.currencyArr.filter((el: Currency) => el.ccy === this.currencyTypeSecond.value)
        this.result2 = +(this.firstValue / Number(res[0].buy)).toFixed(3)
      } else if (this.currencyTypeFirst.value === 'USD' && this.currencyTypeSecond.value === 'USD') {
        this.result2 = this.firstValue;
      } else if (this.currencyTypeFirst.value === 'USD' && this.currencyTypeSecond.value === 'UAH' ) {
        this.convertOnyType();
      } else if (this.currencyTypeFirst.value === 'USD') {
        this.result2 = +(this.firstValue / exchange).toFixed(3)
      } else if (this.currencyTypeFirst.value === 'EUR' && this.currencyTypeSecond.value === 'UAH' ) {
        this.convertOnyType();
      } else if (this.currencyTypeFirst.value === 'EUR' && this.currencyTypeSecond.value === 'EUR') {
        this.result2 = this.firstValue;
      } else if (this.currencyTypeFirst.value === 'EUR') {
        this.result2 = +(this.firstValue / exchange).toFixed(3);
      }

  }

  public exchangeSecond(): void {
    const exchange = +this.currencyArr[1].buy / +this.currencyArr[0].buy;

    if (this.currencyTypeSecond.value === 'UAH' && this.currencyTypeFirst.value === 'UAH') {
      this.result = this.secondValue;
    } else if (this.currencyTypeSecond.value === 'UAH') {
      const res = this.currencyArr.filter((el: Currency) => el.ccy === this.currencyTypeFirst.value)
      this.result = +(this.secondValue / Number(res[0].buy)).toFixed(3)
    } else if ( this.currencyTypeSecond.value === 'USD' && this.currencyTypeFirst.value === 'USD' ) {
      this.result = this.secondValue;
    } else if (this.currencyTypeSecond.value === 'USD' && this.currencyTypeFirst.value === 'UAH' ) {
      this.convertOnyTypeSecond();
    } else if (this.currencyTypeSecond.value === 'USD') {
      this.result = +(this.secondValue / exchange).toFixed(3)
    } else if (this.currencyTypeSecond.value === 'EUR' && this.currencyTypeFirst.value === 'UAH' ) {
      this.convertOnyTypeSecond();
    } else if (this.currencyTypeSecond.value === 'EUR' && this.currencyTypeFirst.value === 'EUR') {
      this.result = this.secondValue;
    } else if (this.currencyTypeSecond.value === 'EUR') {
      this.result = +(this.secondValue / exchange).toFixed(3);
    }
  }

  private convertOnyType(): void {
    const res = this.currencyArr.filter((el: Currency) => el.ccy === this.currencyTypeFirst.value)
    this.result2 = +(this.firstValue * Number(res[0].buy)).toFixed(3)
  }
  private convertOnyTypeSecond(): void {
    const res = this.currencyArr.filter((el: Currency) => el.ccy === this.currencyTypeSecond.value)
    this.result = +(this.secondValue * Number(res[0].buy)).toFixed(3)
  }

}
