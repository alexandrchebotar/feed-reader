import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChannelsComponent } from './channels/channels.component';
import { ItemsComponent } from './items/items.component';
import { SummaryComponent } from './summary/summary.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DataService } from './data.service';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    ItemsComponent,
    SummaryComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
