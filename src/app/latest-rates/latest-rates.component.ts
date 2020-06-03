import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

class RateModel {
  rates: [] ;
  base: string;
  date: string;
}


@Component({
  selector: 'app-latest-rates',
  templateUrl: './latest-rates.component.html',
  styleUrls: ['./latest-rates.component.css'],
})
export class LatestRatesComponent implements OnInit{
  // @Input() sselection: string;
  baseForm = this.fb.group({
    base: ['']
  });
  rates;
  bases = ['EUR', 'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK', 'AUD', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'HRK', 'JPY', 'THB', 'CHF', 'SGD', 'PLN', 'BGN', 'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'ILS', 'GBP', 'KRW', 'MYR'];
  selectedBase = 'EUR';
  selectedSymbol;
  constructor(public fb: FormBuilder, private apiService: ApiService) {
  }
  ngOnInit() {
    this.apiService.getLatestRates().subscribe((data) => {
      let rateModel = new RateModel();
      rateModel = JSON.parse(JSON.stringify(data));
      this.rates = rateModel.rates;
    });
  }
  onSubmit() {
    this.apiService.getLatestRatesByBase(this.baseForm.value.base).subscribe((data) => {
      let rateModel = new RateModel();
      rateModel = JSON.parse(JSON.stringify(data));
      this.rates = rateModel.rates;
    });
  }

}
