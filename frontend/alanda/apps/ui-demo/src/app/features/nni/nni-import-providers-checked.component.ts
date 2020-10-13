import {Component, Input, OnInit} from '@angular/core';
import {AlandaObjectServiceNg, AlandaProject, AlandaTask, BaseFormComponent} from '@alanda/common';
import {map} from "rxjs/operators";
import data from './data/austrian_nni_provider.json';
import {RxState} from "@rx-angular/state";
import {NniProvider, NniProviderSelectionLine, NniState} from "./nni.model";
import {FormControl, FormGroup} from "@angular/forms";
import {of} from "rxjs";

export class Dummy {
  county = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
  ];
}

@Component({
  selector: 'alanda-nni-import-providers-checked',
  templateUrl: './nni-import-providers-checked.component.html',
  styleUrls: [],
})
export class NniImportProvidersCheckedComponent implements BaseFormComponent, OnInit {

  @Input()
  set task(task: AlandaTask) {
    this.state.set({ task });
  }

  @Input()
  set project(project: AlandaProject) {
    this.state.set({ project });
  }

  state$ = this.state.select()

  myCounties = new Dummy();

  response$;

  selects = new FormGroup({
    county: new FormControl(this.myCounties.county),
  });

  constructor(
    private state: RxState<NniState>,
    private alandaObjectService: AlandaObjectServiceNg,
  ) {
  }

  ngOnInit(): void {

    this.response$ = this.alandaObjectService.getAllByTypeName('NNI');

    let counter = 1;

    const nnis$ = this.alandaObjectService.getAllByTypeName('NNI')
      .pipe(
        map(response => {
          const result: NniProviderSelectionLine[] = [];
          response.forEach(
            alandaObject => {



              const sup = alandaObject.objectProperties.find((prop) => prop.key === 'EXTERNSUPPLIER').value;
              const nni = alandaObject.objectProperties.find((prop) => prop.key === 'NNI').value;
              const alias = alandaObject.objectProperties.find((prop) => prop.key === 'ALIAS1').value;
              const name = nni + ' (' + alias + ')';

              console.log(nni)
              console.log(counter++)

              result.push({supplier: sup, nni: name, reference: alandaObject})
            }
          )
          return result;
        })
      );

    this.state.connect('nnis', nnis$);
    this.state.connect('providers', of((<NniProvider[]>data)));
  }

  submit(): void {
    // on complete Task -> update all NNIs (alanda object)
  }
}
