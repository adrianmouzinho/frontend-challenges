import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UnitService } from 'src/app/services/unit.service';
import { Location } from 'src/app/types/location.interface';

const SCHEDULES = {
  morning: {
    start: '06',
    end: '12'
  },
  afternoon: {
    start: '12',
    end: '18'
  },
  night: {
    start: '18',
    end: '22'
  },
};

type TimeOfDay = 'morning' | 'afternoon' | 'night';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  units: Location[] = [];
  filteredUnits: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: UnitService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      timeOfDay: '',
      showClosedUnits: true
    });

    this.unitService.getAllUnits().subscribe(data => {
      this.units = this.filteredUnits = data.locations;
    });
  }

  transformWeekdayToString(day: number) {
    let weekday = null;

    switch (day) {
      case 0:
        weekday = 'Dom.';
        break;

      case 6:
        weekday = 'Sáb.';
        break;

      default:
        weekday = 'Seg. à Sex.';
        break;
    }

    return weekday
  }

  filterByTimeOfDay(units: Location[], timeOfDay: string): Location[] {
    return units.filter(unit => {
      const scheduleExists = unit?.schedules?.find(schedule => {
        const { hour, weekdays } = schedule

        if (hour === 'Fechada') {
          return false
        }

        let [start, end] = hour.split(' às ');

        if (!start || !end) {
          return false;
        }

        start = start.replace('h', '')
        end = end.replace('h', '')

        const weekday = this.transformWeekdayToString(new Date().getDay());

        return !(start >= SCHEDULES[timeOfDay as TimeOfDay].end || end <= SCHEDULES[timeOfDay as TimeOfDay].start) && weekdays === weekday;
      }) ? true : false;

      return scheduleExists;
    })
  }

  onSubmit() {
    if (!this.formGroup.value.showClosedUnits) {
      this.filteredUnits = this.units.filter(unit => unit.opened === true);
    } else {
      this.filteredUnits = this.units;
    }

    if (this.formGroup.value.timeOfDay) {
      this.filteredUnits = this.filterByTimeOfDay(this.filteredUnits, this.formGroup.value.timeOfDay);
    }
  }

  onClear() {
    this.formGroup.reset();
    this.onSubmit();
  }

}
