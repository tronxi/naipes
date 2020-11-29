import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
  }

}
