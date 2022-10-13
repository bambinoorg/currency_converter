import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Currency} from "../../interfaces/currency";
import {CurrencyService} from "../../services/currency.service";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  public currencyArr!: Currency[];
  private destroy$: Subject<null> = new Subject<null>();

  constructor(
    private currencyService: CurrencyService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
      this.currencyService.getPrivat()
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp) => {
        this.currencyArr = resp.map((el: any) => {
          return {
            ...el,
            buy: el.buy.slice(0 , 5),
            sale: el.sale.slice(0 , 5),
          }
        });
        this.currencyArr = this.currencyArr.filter((el) => el.base_ccy !== 'USD')
        this.cdr.detectChanges();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}





