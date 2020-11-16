import { Component, Input, OnInit } from '@angular/core';
import { AlandaProject } from '../../../api/models/project';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AlandaPropertyApiService } from '../../../api/propertyApi.service';

const SELECTOR = 'alanda-prop-text';

@Component({
  selector: SELECTOR,
  templateUrl: './prop-text.component.html',
})
export class AlandaPropTextComponent implements OnInit {
  @Input() propertyName: string;
  @Input() project: AlandaProject;
  @Input() label: string;
  @Input() existingValue: string;
  type = 'STRING';

  @Input()
  rootFormGroup: FormGroup;

  textField = this.fb.group({
    text: [''],
  });

  constructor(
    private readonly propertyService: AlandaPropertyApiService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    if (this.rootFormGroup) {
      this.rootFormGroup.addControl(
        `${SELECTOR}-${this.propertyName}`,
        this.textField,
      );
    }

    if (this.existingValue != null) {
      this.text.setValue(this.existingValue);
    } else {
      this.propertyService
        .get(null, null, this.project.guid, this.propertyName)
        .subscribe((resp) => {
          this.text.setValue(resp.value);
        });
    }
  }

  save(): void {
    this.propertyService
      .set(
        null,
        null,
        this.project.guid,
        this.propertyName,
        this.text.value,
        this.type,
      )
      .subscribe();
  }

  get text(): AbstractControl {
    return this.textField.get('text');
  }
}
