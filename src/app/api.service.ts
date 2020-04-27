import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// function addMonths(date, months) {
//   let d = date.getDate();
//   date.setMonth(date.getMonth() + +months);
//   if (date.getDate() != d) {
//     date.setDate(0);
//   }
//   return date;
// }
export class ApiService {

  // now = new Date();
  // today = this.now.toDateString();
  // monthAgo = addMonths(this.now, -1);
  constructor(private httpClient: HttpClient) { }

  public getLatestRates(){
    return this.httpClient.get('https://api.exchangeratesapi.io/latest');
  }
  public getLatestRatesByBase(base){
  return this.httpClient.get('https://api.exchangeratesapi.io/latest?base=' + base);
  }
  public getLastThirtyDaysByBaseSymbol(base , symbol){
    return this.httpClient.get('https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-01-20&base=' +
      base + '&symbols=' + symbol);
  }
}

