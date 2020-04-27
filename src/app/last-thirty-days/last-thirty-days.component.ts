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
  baseForm = this.fb.group({
    base: [''],
    symbol: ['']
  });
  bases = ['EUR', 'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK', 'AUD', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'HRK', 'JPY', 'THB', 'CHF', 'SGD', 'PLN', 'BGN', 'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'ILS', 'GBP', 'KRW', 'MYR'];
  categories = [];
  rates = [];

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<any>;

  onSubmit() {
    this.apiService.getLastThirtyDaysByBaseSymbol(this.baseForm.value.base, this.baseForm.value.symbol).subscribe((data) => {

      for (let key in data.rates) {
        let value = data.rates[key];
        this.categories.push(key);
        let [currency, exchange] = Object.entries(data.rates[key])[0];
        this.rates.push(exchange);
      }
      console.log(this.rates);
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
          text: 'Last 30 days for ' + this.oppoSuitsForm.value.symbol + ' from ' + this.oppoSuitsForm.value.base
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
    this.selectedSymbol = 'AUD';
    this.selectedBase = 'EUR';
    this.apiService.getLastThirtyDaysByBaseSymbol(this.selectedBase, this.selectedSymbol).subscribe((data) => {
      for (let key in data.rates) {
        let value = data.rates[key];
        this.categories.push(key);
        let [currency, exchange] = Object.entries(data.rates[key])[0];
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
