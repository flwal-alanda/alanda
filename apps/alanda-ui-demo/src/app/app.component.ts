import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'alanda-io-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alanda-ui-demo';

  constructor(private router: Router) {
    this.router.navigate(['test', '4f9adbac-743c-11ea-8e25-02420a640002']);
  }

}
