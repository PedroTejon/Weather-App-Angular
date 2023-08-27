import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss']
})
export class ForecastCardComponent {
  @Input() dados: any;

  @Input('dados')
  set set_dados(val: any) {
    this.dados = val;
    
    let time = new Date(Number(this.dados['dt']) * 1000);
    this.data = time.getDate().toString() + '/' + (time.getMonth() + 1).toString().padStart(2, '0');
    this.temp = Number(this.dados['main']['temp']).toFixed(0);
    let weatherIcons: any = {
      'Clouds': 'fa-cloud',
      'Clear': 'fa-sun',
      'Snow': 'fa-snowflake',
      'Rain': 'fa-cloud-showers-heavy',
      'Thunderstorm': 'fa-cloud-thunder',
      'Drizzle': 'fa-cloud-showers-heavy'
    }
    this.icon = weatherIcons[this.dados['weather'][0]['main']] ? weatherIcons[this.dados['weather'][0]['main']] : 'fa-xmark'
  }
  data: string | undefined;
  temp: string | undefined;
  icon: string | undefined;

  constructor() {}
}
