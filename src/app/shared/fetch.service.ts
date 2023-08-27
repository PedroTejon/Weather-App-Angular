import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  constructor(private httpClient: HttpClient) {}

  public fetch(url: string){
    return this.httpClient.get(url, {observe: 'response'});
  }
}
