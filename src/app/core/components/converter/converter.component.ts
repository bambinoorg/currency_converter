import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, take, takeUntil} from "rxjs";

//Have more time and find a good free api, and make a code much better.
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent implements OnInit, OnDestroy {

  public currencyArr!: string[];
  public exchangeRates!: [];
  public currencyGroup!: FormGroup;
  private destroy$: Subject<null> = new Subject<null>();

  constructor(
    private currencyService: CurrencyService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createGroup();
    this.getCurrency("UAH");
    this.createSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public changeCurrencyType(key: string): void {
    if (key === 'first') {
      const baseCurrency = this.currencyGroup.get('endCurrencyType')?.value;
      this.getCurrency(baseCurrency);
      const value = this.currencyGroup.get('secondValue')?.value
      console.log(value)
      this.exchange('firstValue', value, 'startCurrencyType');

    } else if (key === 'second') {
      const baseCurrency = this.currencyGroup.get('startCurrencyType')?.value;
      this.getCurrency(baseCurrency);
      const value = this.currencyGroup.get('firstValue')?.value
      this.exchange('secondValue', value, 'endCurrencyType');

    }
  }

  private exchange(patchKey: string, value: number, currencyTypeKey: string): void {

    const currencyType = this.currencyGroup.get(currencyTypeKey)?.value;
    const currencyValue = (value * this.exchangeRates[currencyType]).toFixed(2);
    console.log(currencyType);
    console.log(this.exchangeRates[currencyType],"this.exchangeRates[currencyType]")
    this.currencyGroup.patchValue({[patchKey] : +currencyValue }, { emitEvent: false });
    this.cdr.detectChanges();
  }

  private createGroup(): void {
    this.currencyGroup = this.fb.group({
      startCurrencyType: ['UAH'],
      endCurrencyType: ['USD'],
      firstValue: [null],
      secondValue: [null]
    })
  }

  private getCurrency(baseCurrency: string): void {
    this.currencyService.getExchangeRates(baseCurrency)
      .pipe(takeUntil(this.destroy$),
        take(1))
      .subscribe((resp) => {
      this.currencyArr = Object.keys(resp.rates);
      this.exchangeRates = resp.rates;
        console.log(this.exchangeRates);
        this.cdr.detectChanges();
    })
  }

  private createSubscribe(): void {
    this.currencyGroup.get('firstValue')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.exchange('secondValue', value, 'endCurrencyType');
      })
    this.currencyGroup.get('secondValue')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.exchange('firstValue', value, 'startCurrencyType');
      })
  }

 public changeBaseStart(): void {
   this.getCurrency( this.currencyGroup.get('startCurrencyType')?.value);
  }

  changeBaseEnd() {
    this.getCurrency( this.currencyGroup.get('endCurrencyType')?.value);
  }
}


