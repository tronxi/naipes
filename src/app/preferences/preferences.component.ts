import { Component, OnInit } from '@angular/core';
import {PreferencesService} from '../services/preferences.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  time: string;
  numCards: string;

  constructor(private preferencesService: PreferencesService,
              private router: Router) { }

  ngOnInit(): void {
    this.numCards = this.preferencesService.get('numCards', '32');
    this.time = this.preferencesService.get('time', '0');
  }

  savePreferences(): void {
    this.preferencesService.save('numCards', this.numCards);
    this.preferencesService.save('time', this.time);
    this.router.navigateByUrl('/game');
  }

}
