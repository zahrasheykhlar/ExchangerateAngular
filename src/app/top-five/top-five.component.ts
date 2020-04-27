import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.css']
})
export class TopFiveComponent implements OnInit {
  baseForm = this.fb.group({
    base: ['']
  });
  bases = ['EUR', 'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK', 'AUD', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'HRK', 'JPY', 'THB', 'CHF', 'SGD', 'PLN', 'BGN', 'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'ILS', 'GBP', 'KRW', 'MYR'];

  topFive = [];

  constructor(public fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(type) {
    this.apiService.getLastThirtyDaysByBaseSymbol(this.baseForm.value.base, '').subscribe((data) => {
      const orderedDates = {};
      Object.keys(data.rates).sort(function(a, b) {
        return moment(b, 'DD-MM-YYYY').toDate() - moment(a, 'DD-MM-YYYY').toDate();
      }).forEach(function(key) {
        orderedDates[key] = data.rates[key];
      });
      const lastRates = Object.values(orderedDates)[0];
      const previousRates = Object.values(orderedDates)[1];

      const differences = {};

      Object.keys(lastRates).forEach(function(key) {
        differences[key] = lastRates[key] - previousRates[key];
      });
      console.log(differences);

      const orderedDiffs = {};
      Object.values(differences).sort(function(a, b) {
        return a - b;
      }).forEach(function(key) {
        orderedDiffs[key] = differences[key];
      });
      console.log(orderedDiffs);


      // Create items array
      const ordereDiffs = Object.keys(differences).map(function(key) {
        return [key, differences[key], ((lastRates[key] / previousRates[key]) - 1 ) / 0.01];
      });

      // Sort the array based on the second element
      ordereDiffs.sort(function(first, second) {
        return second[1] - first[1];
      });

      console.log(ordereDiffs);
     // Create a new array with only the first 5 items
      if ( type === 'increase')
      {
        this.topFive = ordereDiffs.slice( 0 , 5 );
      }
      else {
       this.topFive = ordereDiffs.reverse().slice( 0 , 5 );
      }
    });
  }
}
