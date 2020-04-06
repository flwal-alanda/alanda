import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlandaUiModule } from '@alanda-io/alanda-ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AlandaUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
