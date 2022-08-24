import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GenerationProgrammeComponent } from './components/generation-programme/generation-programme.component';
import { ProgrammeJourComponent } from './components/programme-jour/programme-jour.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerationProgrammeComponent,
    ProgrammeJourComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
