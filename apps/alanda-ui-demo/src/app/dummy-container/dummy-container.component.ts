import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'alanda-io-dummy-container',
  templateUrl: './dummy-container.component.html',
  styleUrls: ['./dummy-container.component.css']
})
export class DummyContainerComponent implements OnInit {

  state$ = this.appState.select(map(s => {
    const {task, project, ...unused} = s;
    return {task, project};
  }))

  constructor(private appState: AppStateService) {
  }

  ngOnInit(): void {
  }

}
