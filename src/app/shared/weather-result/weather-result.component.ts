import { Component, ElementRef, ViewChild } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent {
  constructor(private fetchService: FetchService) {}

  todays: Array<any> = [];
  forecasts: Array<any> = [];
  weatherIcon: string | undefined;
  @ViewChild('inpCidade') inpCidade:ElementRef | undefined;
  ngOnInit() {
    this.getCityWeather()
  }

  getCityWeather(){
    let cidade = this.inpCidade ? this.inpCidade?.nativeElement.value : 'Sorocaba'

    this.fetchService.fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cidade + '&appid=e953bf46b3d7b61d6c72f50055103c52&units=metric')
      .subscribe((res: any) => {
        if (res.status === 200){
          let result = res.body;
          
          let weatherIcons: any = {
            'Clouds': 'fa-cloud',
            'Clear': 'fa-sun',
            'Snow': 'fa-snowflake',
            'Rain': 'fa-cloud-showers-heavy',
            'Thunderstorm': 'fa-cloud-thunder',
            'Drizzle': 'fa-cloud-showers-heavy'
          }
          this.weatherIcon = weatherIcons[result['weather'][0]['main']] ? weatherIcons[result['weather'][0]['main']] : 'fa-xmark'
          
          
          this.todays = [result['weather'][0]['main'], result['weather'][0]['description'], result['main']['temp'] + 'ºC', result['main']['humidity'] + '%'];
        }
      });

    this.fetchService.fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cidade + '&appid=e953bf46b3d7b61d6c72f50055103c52&units=metric')
      .subscribe((res: any) => {
        if (res.status === 200){
          let horario = Number(Date().toString().split(' ')[4].split(':')[0]);
          let possiveis = [0, 3, 6, 9, 12, 15, 18, 21]
          var closest = possiveis.reduce(function(prev, curr) {
            return (Math.abs(curr - horario) < Math.abs(prev - horario) ? curr : prev);
          });
          
          let pos = possiveis.findIndex((val) => {return val === closest}) - 1
          this.forecasts = [res.body['list'][0 + pos], res.body['list'][8 + pos], res.body['list'][16 + pos], res.body['list'][24 + pos], res.body['list'][32 + pos]]
        }
      })
  }
}
