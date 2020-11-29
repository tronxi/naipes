import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private baseUrl = 'http://fenw.etsisi.upm.es:10000/records';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.baseUrl, {observe: 'response'});
  }

  findByUser() {
    return this.http.get(this.baseUrl + '/user', {observe: 'response'});
  }

  delete() {
    return this.http.delete(this.baseUrl, {observe: 'response'});
  }

  save(score, cards, time) {
    return this.http.post(this.baseUrl, {punctuation: score, cards, disposedTime: time },{observe: 'response'});
  }
}
