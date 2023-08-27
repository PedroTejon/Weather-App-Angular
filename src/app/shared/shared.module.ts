import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResultComponent } from './weather-result/weather-result.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { FormsModule }        from '@angular/forms';


@NgModule({
  declarations: [
    WeatherResultComponent,
    ForecastCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    WeatherResultComponent,
    ForecastCardComponent
  ]
})
export class SharedModule { }
