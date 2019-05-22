import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeedsComponent } from './feeds/feeds.component';
import { ItemsComponent } from './items/items.component';
import { DescriptionComponent } from './description/description.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DataService } from './data.service';
import { StatisticsService } from './statistics.service';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartComponent } from './chart/chart.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FeedsComponent,
    ItemsComponent,
    DescriptionComponent,
    StatisticsComponent,
    NavbarComponent,
    ChartComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, DataService, StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
