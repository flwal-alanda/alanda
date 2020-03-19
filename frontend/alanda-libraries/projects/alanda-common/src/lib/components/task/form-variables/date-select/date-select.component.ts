import { Component, OnInit, Input } from '@angular/core';
import { AlandaProject } from 'projects/alanda-common/src/lib/api/models/project';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlandaPropertyApiService } from 'projects/alanda-common/src/lib/api/propertyApi.service';
import { AlandaFormsRegisterService } from 'projects/alanda-common/src/lib/services/formsRegister.service';

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

    dateForm: FormGroup;

    constructor(private messageService: MessageService, private propertyService: AlandaPropertyApiService,
                private formsRegisterService: AlandaFormsRegisterService){}

    ngOnInit(){
      this.initFormGroup();
      this.load();
    }

    initFormGroup() {
      this.dateForm = new FormGroup({
        date: new FormControl(null, Validators.required),
      });
      this.formsRegisterService.registerForm(this.dateForm, this.formName);
    }

    save() {
      // TODO: use better variable name, maybe improve
      let d = new Date(this.dateForm.get('date').value);
      let utcDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      this.propertyService.setString(null, null, this.project.guid, this.key, utcDate.toISOString().substring(0,10)).subscribe();
    }

    load() {
      this.propertyService.get(null, null, this.project.guid, this.key).subscribe(
        res => {
          if(res.value) {
            let date = new Date(res.value);
            this.dateForm.get('date').setValue(date);
          }
        }
      );
    }
  }
