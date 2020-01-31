import { Component, OnInit } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup, ValidationErrors, FormControl } from "@angular/forms";
import { PmcUserServiceNg } from "projects/alanda-common/src/public_api";
import { DataService } from "./data.service";
import { switchMap, startWith } from "rxjs/operators";
import { MyFormlyFieldConfig } from "./formly.service";

@Component({
    selector: 'app-formly',
    templateUrl: './formly.component.html',
    styleUrls: []
  })
  export class FormlyComponent implements OnInit {

    constructor(private userService: PmcUserServiceNg, public dataService: DataService) {}

    form: FormGroup = new FormGroup({});

    model: any = {
      id: 123123,
      firstname: 'Peter',
      age: 22,
      nationId: 2,
      ip: null
    };

    fields: FormlyFieldConfig[] = [
      {
        key: 'id'
      },
      {
        key: 'firstname',
        type: 'input',
        templateOptions: {
          label: 'Firstname',
          required: true
        },
        hooks: {
          onInit: (field: FormlyFieldConfig) => {
            field.form.get('age').valueChanges
          }
        }
      },
      {
        key: 'age',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Age',
          min: 18
        },
        validation: {
          messages: {
            min: 'Sorry, you have to be older than 18'
          }
        }
      },
      {
        key: 'nationId',
        type: 'select',
        templateOptions: {
          label: 'Nation',
          options: this.dataService.getNations()
        }
      },
      {
        key: 'cityId',
        type: 'primeng-autocomplete',
        templateOptions: {
          label: 'City',
          options:  ['x', 'y', 'z'],
          change: (event) => {
            console.log("input change", event);
          }
        },
        hideExpression: model => !model.nationId,
        expressionProperties: {
          'templateOptions.disabled': model => !model.nationId,
          'model.cityId': '!model.nationId ? null : model.cityId'
        },
        hooks: {
          /* onInit: (field: FormlyFieldConfig) => {
            field.templateOptions.options = field.form.get('nationId').valueChanges.pipe(
              startWith(this.model.nationId),
              switchMap(nationId => this.dataService.getCities(nationId))
            );
          } */
        }
      },
      {
        key: 'ip',
        type: 'input',
        templateOptions: {
          label: 'IP Address',
          required: true
        },
        validators: {
          // validation: ['ip']
          ip2: {
            expression: control => !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value),
            message: (err, field: FormlyFieldConfig) => `${field.formControl.value} is not a valid IP address`
          }
        }
      }

    ];

    ngOnInit() {}

    onSubmit({valid, value}) {
      console.log(value);
    }

    search(event) {
      console.log(event);
    }

  }
