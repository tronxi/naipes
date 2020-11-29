import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../../services/records.service';

@Component({
  selector: 'app-personal-records',
  templateUrl: './personal-records.component.html',
  styleUrls: ['./personal-records.component.css']
})
export class PersonalRecordsComponent implements OnInit {

  records;

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.findByUser();
  }

  findByUser(): void {
    this.recordsService.findByUser().subscribe(
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

  deleteByUser(): void {
    this.recordsService.delete().subscribe(
      response => {
        this.findByUser();
      }, error => {
        console.log(error);
      }
    );
  }

}
