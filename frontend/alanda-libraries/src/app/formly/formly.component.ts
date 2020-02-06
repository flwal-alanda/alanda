import { Component, OnInit } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup } from "@angular/forms";
import { PmcUserServiceNg, PmcGroupServiceNg } from "projects/alanda-common/src/public_api";
import { DataService } from "./data.service";
import { switchMap, map } from "rxjs/operators";
import { FormlyService } from "./formly.service";
import { getServerOptions } from "projects/alanda-common/src/lib/utils/utils";

@Component({
    selector: 'app-formly',
    templateUrl: './formly.component.html',
    styleUrls: []
  })
  export class FormlyComponent implements OnInit {

    constructor(public userService: PmcUserServiceNg, public dataService: DataService, private pmcGroupService: PmcGroupServiceNg,
      private formlyService: FormlyService) {}

    form: FormGroup = new FormGroup({});

    /* model: any = {
      firstname: 'Peter',
      age: 22,
      nationId: 2,
      //group: 1 //why do I have to set this manually? (ideally i dont want to set anything manually)
    }; */

    model1: any = {};
    model2: any = {};

    cfg1: FormlyFieldConfig[] = [
      {
        wrappers: ['panel-wrapper'],
        templateOptions: {label: 'Model 1'},
        fieldGroup: [
          {
            fieldGroupClassName: 'p-grid ui-fluid',
            fieldGroup: [
              {
                className: 'p-col-2',
                key: 'firstname1',
                type: 'input',
                templateOptions: {
                  label: 'Firstname',
                  required: true
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    field.form.get('age1').valueChanges
                  }
                }
              },
              {
                className: 'p-col-2',
                key: 'age1',
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
                className: 'p-col-2',
                key: 'nationId1',
                type: 'select',
                templateOptions: {
                  label: 'Nation',
                  options: this.dataService.getNations()
                }
              },
              {
                className: 'p-col-2',
                key: 'date1',
                type: 'primeng-calendar',
                templateOptions: {
                  label: 'Start Date',
                  placeholder: 'start date'
                }
              }
            ]
          },
          {
            fieldGroupClassName: 'p-grid',
            fieldGroup: [
              {
                className: 'p-col-2',
                key: 'cityId1',
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
                  'templateOptions.disabled': model => !model.nationId1,
                  'model.cityId1': '!model.nationId1 ? null : model.cityId1'
                },
              },
              {
                className: 'p-col-2',
                key: 'ip1',
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
              },
              {
                className: 'p-col-2',
                key: 'group1',
                type: 'select',
                // defaultValue: ''
                templateOptions: {
                  placeholder: '---', //is there an easier way? i want an empty field in the beginning for example
                  label: 'Groups',
                  options: [],
                  labelProp: 'longName',
                  valueProp: 'guid' // how to set object as value here?

                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    /* this.pmcGroupService.getGroups(getServerOptions()).subscribe(
                      res => {
                        field.templateOptions.options = res.results;
                        this.form.get('group').setValue(res.results[0].guid); //set default value
                      }
                    ); */
                    field.templateOptions.options = this.pmcGroupService.getGroups(getServerOptions()).pipe(
                      map(res => res.results), //why does it not update the model initially?
                    );
                  }
                }
              },
              {
                className: 'p-col-2',
                key: 'user1',
                type: 'select',
                // hideExpression: model => !model.group,
                templateOptions: {
                  placeholder: '---',
                  label: 'Users',
                  options: [],
                  labelProp: 'loginName',
                  valueProp: 'guid' // how to set object as value here?
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    field.templateOptions.options = this.form.get('group1').valueChanges.pipe(
                      // startWith(this.form.get('group').value), //why doesnt this work?
                      switchMap(groupId => this.userService.getUsersByGroupId(groupId)),
                      // tap(() => field.formControl.setValue(null))
                    );
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': (model: any) => {
                    return model.group;
                  }
                },
              }
            ]
          }
        ]
      }
    ];

    cfg2: FormlyFieldConfig[] = [
      {
        fieldGroupClassName: 'p-grid ui-fluid',
        fieldGroup: [
          {
            className: 'p-col-2',
            key: 'firstname2',
            type: 'input',
            templateOptions: {
              label: 'Firstname',
              required: true
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                field.form.get('age2').valueChanges
              }
            }
          },
          {
            className: 'p-col-2',
            key: 'age2',
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
            className: 'p-col-2',
            key: 'nationId2',
            type: 'select',
            templateOptions: {
              label: 'Nation',
              options: this.dataService.getNations()
            }
          },
          {
            className: 'p-col-2',
            key: 'date2',
            type: 'primeng-calendar',
            templateOptions: {
              label: 'Start Date',
              placeholder: 'start date'
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'p-grid',
        fieldGroup: [
          {
            className: 'p-col-2',
            key: 'cityId2',
            type: 'primeng-autocomplete',
            templateOptions: {
              label: 'City',
              options:  ['x', 'y', 'z'],
              change: (event) => {
                console.log("input change", event);
              }
            },
            hideExpression: model => !model.nationId2,
            expressionProperties: {
              'templateOptions.disabled': model => !model.nationId2,
              'model.cityId2': '!model.nationId2 ? null : model.cityId2'
            },
          },
          {
            className: 'p-col-2',
            key: 'ip2',
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
          },
          {
            className: 'p-col-2',
            key: 'group2',
            type: 'select',
            // defaultValue: ''
            templateOptions: {
              placeholder: '---', //is there an easier way? i want an empty field in the beginning for example
              label: 'Groups',
              options: [],
              labelProp: 'longName',
              valueProp: 'guid' // how to set object as value here?

            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                /* this.pmcGroupService.getGroups(getServerOptions()).subscribe(
                  res => {
                    field.templateOptions.options = res.results;
                    this.form.get('group').setValue(res.results[0].guid); //set default value
                  }
                ); */
                field.templateOptions.options = this.pmcGroupService.getGroups(getServerOptions()).pipe(
                  map(res => res.results), //why does it not update the model initially?
                );
              }
            }
          },
          {
            className: 'p-col-2',
            key: 'user2',
            type: 'select',
            // hideExpression: model => !model.group,
            templateOptions: {
              placeholder: '---',
              label: 'Users',
              options: [],
              labelProp: 'loginName',
              valueProp: 'guid' // how to set object as value here?
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                field.templateOptions.options = this.form.get('group2').valueChanges.pipe(
                  // startWith(this.form.get('group').value), //why doesnt this work?
                  switchMap(groupId => this.userService.getUsersByGroupId(groupId)),
                  // tap(() => field.formControl.setValue(null))
                );
              }
            },
            expressionProperties: {
              'templateOptions.disabled': (model: any) => {
                return model.group;
              }
            },
          }
        ]
      }
    ];

    ngOnInit() {}

  }
