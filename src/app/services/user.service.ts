import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://fenw.etsisi.upm.es:10000';

  login(username: string, password: string) {
    return this.http.get(this.baseUrl + '/users/login?username=' + username + '&password=' + password,  {observe: 'response'});
  }

  check(userName: string) {
    return this.http.get(this.baseUrl + '/users/' + userName);
  }

  register(username, email, password) {
    return this.http.post(this.baseUrl + '/users', {username, email, password});
  }
}
