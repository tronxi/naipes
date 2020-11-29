import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public exist = false;

  constructor() { }

  save(token: string): void {
    sessionStorage.setItem('token', token);
    this.exist = true;
  }

  destroy(): void {
    sessionStorage.setItem('token', null);
    this.exist = false;
  }

  get(): string {
    return sessionStorage.getItem('token');
  }
}
