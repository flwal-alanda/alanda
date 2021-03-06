import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AlandaPropertyApiService } from '../../../api/propertyApi.service';
import { AlandaProject } from '../../../api/models/project';
import { AlandaUser } from '../../../api/models/user';
import { Authorizations } from '../../../permissions';

const SELECTOR = 'alanda-prop-select';

@Component({
  selector: SELECTOR,
  templateUrl: './prop-select.component.html',
  styleUrls: [],
})
export class AlandaPropSelectComponent implements OnInit {
  @Input() items: SelectItem[];
  @Input() propertyName: string;
  @Input() project: AlandaProject;
  @Input() label: string;
  @Input() type?: string;
  @Input() user: AlandaUser;
  @Input() rootFormGroup: FormGroup;

  canWrite: boolean;

  selectForm = this.fb.group({
    selected: [null, Validators.required],
  });

  constructor(
    private readonly propertyService: AlandaPropertyApiService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    if (this.rootFormGroup) {
      this.rootFormGroup.addControl(
        `${SELECTOR}-${this.propertyName}`,
        this.selectForm,
      );
    }
    if (!this.type) {
      this.type = 'STRING';
    }
    if (this.user != null) {
      const authStr = `prop:${this.project.authBase}:${this.propertyName}`;
      this.canWrite = Authorizations.hasPermission(this.user, authStr, 'write');
    } else {
      this.canWrite = true;
    }
    this.propertyService
      .get(null, null, this.project.guid, this.propertyName)
      .subscribe((resp) => {
        this.selected.setValue(resp.value);
      });
  }

  save() {
    this.propertyService
      .set(
        null,
        null,
        this.project.guid,
        this.propertyName,
        this.selected.value,
        this.type,
      )
      .subscribe();
  }

  get selected(): AbstractControl {
    return this.selectForm.get('selected');
  }
}
