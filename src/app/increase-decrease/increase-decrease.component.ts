import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import * as moment from 'moment';


@Component({
  selector: 'app-increase-decrease',
  templateUrl: './increase-decrease.component.html',
  styleUrls: ['./increase-decrease.component.css']
})
export class IncreaseDecreaseComponent implements OnInit {
  @Input() base: string;
  @Input() symbol: string;
  change;
  constructor(private apiService: ApiService) {
    }
  ngOnInit(): void {
    this.apiService.getLastThirtyDaysByBaseSymbol(this.base, this.symbol).subscribe((data) => {
      console.log(data.rates);
      const orderedDates = {};
      Object.keys(data.rates).sort(function(a, b) {
        return moment(b, 'DD-MM-YYYY').toDate() - moment(a, 'DD-MM-YYYY').toDate();
      }).forEach(function(key) {
        orderedDates[key] = data.rates[key];
      });
      console.log(orderedDates);
      const lastRate = Object.values(Object.values(orderedDates)[0])[0];
      const previousRate = Object.values(Object.values(orderedDates)[1])[0];
      this.change = lastRate - previousRate;

    });
  }
}
