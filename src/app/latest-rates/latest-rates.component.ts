import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-latest-rates',
  templateUrl: './latest-rates.component.html',
  styleUrls: ['./latest-rates.component.css'],
})
export class LatestRatesComponent implements OnInit{
  @Input() sselection: string;
  baseFormm = this.fb.group({
    base: ['']
  });
  rates;
  bases = ['EUR', 'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK', 'AUD', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'HRK', 'JPY', 'THB', 'CHF', 'SGD', 'PLN', 'BGN', 'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'ILS', 'GBP', 'KRW', 'MYR'];
  selectedBase = 'EUR';
  constructor(public fb: FormBuilder, private apiService: ApiService) {
  }
  ngOnInit() {
    this.apiService.getLatestRates().subscribe((data) => {
      this.rates = data.rates;
    });
  }
  onSubmit() {
    this.apiService.getLatestRatesByBase(this.baseFormm.value.base).subscribe((data) => {
      this.rates = data.rates;
    });
  }

}
