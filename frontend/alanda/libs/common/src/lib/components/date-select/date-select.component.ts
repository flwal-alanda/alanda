import { Component, OnInit, Input, Inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlandaPropertyApiService } from '../../api/propertyApi.service';
import { AlandaProject } from '../../api/models/project';
import { APP_CONFIG, AppSettings } from '../../models/appSettings';

@Component({
  selector: 'alanda-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: [],
})
export class AlandaDateSelectComponent implements OnInit {
  @Input() key: string;
  @Input() label: string;
  @Input() project: AlandaProject;
  @Input() formName: string;
  @Input() dateFormat: string;
  @Input()
  set rootFormGroup(rootFormGroup: FormGroup) {
    if (rootFormGroup) {
      rootFormGroup.addControl(this.formName, this.dateForm);
    }
  }

  dateForm = new FormGroup({
    date: new FormControl(null, Validators.required),
  });

  constructor(
    private readonly messageService: MessageService,
    private readonly propertyService: AlandaPropertyApiService,
    @Inject(APP_CONFIG) config: AppSettings,
  ) {
    if (!this.dateFormat) {
      this.dateFormat = config.DATE_FORMAT_PRIME;
    }
  }

  ngOnInit() {
    this.load();
  }

  save() {
    // TODO: use better variable name, maybe improve
    const d = new Date(this.dateForm.get('date').value);
    const utcDate = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()),
    );
    this.propertyService
      .setString(
        null,
        null,
        this.project.guid,
        this.key,
        utcDate.toISOString().substring(0, 10),
      )
      .subscribe();
  }

  load() {
    this.propertyService
      .get(null, null, this.project.guid, this.key)
      .subscribe((res) => {
        if (res.value) {
          const date = new Date(res.value);
          this.dateForm.get('date').setValue(date);
        }
      });
  }
}
