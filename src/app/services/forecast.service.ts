import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';

import * as mockForecast from '../mock/mock-forecast.json';

@Injectable()
export class ForecastService {

 
  constructor(
  ) {}

  public getForeCast(): Observable<any> {
     return of(mockForecast);
  }
}
