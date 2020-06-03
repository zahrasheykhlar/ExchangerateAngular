import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ApiService} from '../api.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
class RateModel {
  rates: [] ;
  base: string;
  date: string;
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-last-thirty-days',
  templateUrl: './last-thirty-days.component.html',
  styleUrls: ['./last-thirty-days.component.css']
})
export class LastThirtyDaysComponent implements OnInit {
  @Input() selectedBase: string;
  @Input() selectedSymbol: string;
  baseFormm = this.fb.group({
    base: [''],
    symbol: ['']
  });
  bases = ['EUR', 'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK', 'AUD', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'HRK', 'JPY', 'THB', 'CHF', 'SGD', 'PLN', 'BGN', 'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'ILS', 'GBP', 'KRW', 'MYR'];
  categories = [];
  rates = [];

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<any>;

  onSubmit() {
    this.apiService.getLastThirtyDaysByBaseSymbol(this.baseFormm.value.base, this.baseFormm.value.symbol).subscribe((data) => {
      let rateModel = new RateModel();
      rateModel = JSON.parse(JSON.stringify(data));
      this.rates = rateModel.rates;
      // tslint:disable-next-line:forin
      for (const key in rateModel.rates) {
        // let value = rateModel.rates[key];
        this.categories.push(key);
        const [currency, exchange] = Object.entries(rateModel.rates[key])[0];
        this.rates.push(exchange);
      }
      this.chartOptions = {
        series: [
          {
            name: 'Rate',
            data: this.rates
          }
        ],
        chart: {
          height: 350,
          type: 'bar'
        },
        title: {
          text: 'Last 30 days for ' + this.baseFormm.value.symbol + ' from ' + this.baseFormm.value.base
          // + data.rates[0].name + ' from ' + data.base
        },
        xaxis: {
          categories: this.categories
        }
      };
    });
  }
  ngOnInit(): void {

  }
  constructor(public fb: FormBuilder, private apiService: ApiService) {
    // tslint:disable-next-line:triple-equals
    alert(this.selectedBase);
    alert(this.selectedSymbol);
    if (this.selectedBase === undefined || this.selectedSymbol === undefined)
    {
      this.selectedSymbol = 'AUD';
      this.selectedBase = 'EUR';
    }
    this.apiService.getLastThirtyDaysByBaseSymbol(this.selectedBase, this.selectedSymbol).subscribe((data) => {
      let rateModel = new RateModel();
      rateModel = JSON.parse(JSON.stringify(data));
      this.rates = rateModel.rates;
      // tslint:disable-next-line:forin
      for (const key in rateModel.rates) {
        // let value = rateModel.rates[key];
        this.categories.push(key);
        const [currency, exchange] = Object.entries(rateModel.rates[key])[0];
        this.rates.push(exchange);
      }
      this.chartOptions = {
        series: [
          {
            name: 'Rate',
            data: this.rates
          }
        ],
        chart: {
          height: 350,
          type: 'bar'
        },
        title: {
          text: 'Last 30 days for ' + this.selectedSymbol + ' from ' + this.selectedBase
          // + data.rates[0].name + ' from ' + data.base
        },
        xaxis: {
          categories: this.categories
        }
      };
    });
  }
}
