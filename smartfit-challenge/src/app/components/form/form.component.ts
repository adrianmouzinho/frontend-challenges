import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  unitsFound = [];
  formGroup!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: UnitService
  ) { }

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe(data => console.log(data));
    this.formGroup = this.formBuilder.group({
      timeOfDay: ['', [Validators.required]],
      showClosedUnits: false
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    console.log(this.formGroup.value)
  }

  onClear() {
    this.submitted = false;
    this.formGroup.reset();
  }

}
