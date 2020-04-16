import { Component } from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Params, Router, RouterEvent} from '@angular/router';
import {filter} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'alanda-io-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alanda-ui-demo';
  public params: BehaviorSubject<Params>;
  public paramsSnapshot: Params = {};

  constructor(private router: Router) {


  }

  navigate(route: string) {
    this.router.navigate([route, '4f9adbac-743c-11ea-8e25-02420a640002'])
  }

}
