import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AlandaUiModule, ApiSettings} from '@alanda-io/alanda-ui';
import {AppComponent} from './app.component';
import {PrepareEventRequestComponent} from './prepare-event-request/prepare-event-request.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {Pane1DummyComponent} from './pane-dummy/pane1-dummy.component';
import {Pane2DummyComponent} from "./pane2-dummy/pane2-dummy.component";
import {CheckCoverageComponent} from "./check-coverage/check-coverage.component";

const APP_CONFIG: ApiSettings = {API_ENDPOINT: 'sfdsf'};

@NgModule({
  declarations: [AppComponent, PrepareEventRequestComponent, CheckCoverageComponent, Pane1DummyComponent, Pane2DummyComponent],
  imports: [
    BrowserModule,
    AlandaUiModule.forRoot(APP_CONFIG),
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
