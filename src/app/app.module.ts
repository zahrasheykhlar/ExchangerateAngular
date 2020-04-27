import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LatestRatesComponent } from './latest-rates/latest-rates.component';
import { LastThirtyDaysComponent } from './last-thirty-days/last-thirty-days.component';
import { TopFiveComponent } from './top-five/top-five.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IncreaseDecreaseComponent } from './increase-decrease/increase-decrease.component';
import { TopIncreaseComponent } from './top-increase/top-increase.component';
import { TopDecreaseComponent } from './top-decrease/top-decrease.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LatestRatesComponent,
    LastThirtyDaysComponent,
    TopFiveComponent,
    IncreaseDecreaseComponent,
    TopIncreaseComponent,
    TopDecreaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    NgApexchartsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
