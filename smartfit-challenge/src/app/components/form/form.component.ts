import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UnitService } from 'src/app/services/unit.service';
import { Location } from 'src/app/types/location.interface';

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

  onSubmit() {
    if (!this.formGroup.value.showClosedUnits) {
      this.filteredUnits = this.units.filter(unit => unit.opened === true);
    } else {
      this.filteredUnits = this.units;
    }
  }

  onClear() {
    this.formGroup.reset();
  }

}
