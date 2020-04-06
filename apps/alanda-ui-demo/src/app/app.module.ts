import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlandaUiModule, APP_CONFIG } from '@alanda-io/alanda-ui';
import { AppComponent } from './app.component';
import { DummyContainerComponent } from './dummy-container/dummy-container.component';
import { PrepareVacationRequestComponent } from './prepare-vacation-request/prepare-vacation-request.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

const CURRENT_CONFIG: AppSettings = ALANDA_CONFIG;

@NgModule({
  declarations: [AppComponent, DummyContainerComponent, PrepareVacationRequestComponent],
  imports: [
    BrowserModule,
    AlandaUiModule.forRoot(CURRENT_CONFIG),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: CURRENT_CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
