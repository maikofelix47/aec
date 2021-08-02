import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ForecastService } from './services/forecast.service';
import { DrierDocService } from './drier-doc.service';
import { CropService } from './crop.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ForecastService,DrierDocService,CropService],
  bootstrap: [AppComponent]
})
export class AppModule { }
