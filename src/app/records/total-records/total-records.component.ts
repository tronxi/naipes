import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../../services/records.service';

@Component({
  selector: 'app-total-records',
  templateUrl: './total-records.component.html',
  styleUrls: ['./total-records.component.css']
})
export class TotalRecordsComponent implements OnInit {

  records;

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.recordsService.findAll().subscribe(
      response => {
        console.log(response.body);
        this.records = response.body;
      }, error => {
        console.log(error);
      }
    );
  }

  formatDate(recordDate): string {
    const date = new Date();
    date.setTime(recordDate);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

}
