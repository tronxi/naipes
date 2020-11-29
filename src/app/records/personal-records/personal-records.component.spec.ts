import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRecordsComponent } from './personal-records.component';

describe('PersonalRecordsComponent', () => {
  let component: PersonalRecordsComponent;
  let fixture: ComponentFixture<PersonalRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
