import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeedsComponent } from './feeds/feeds.component';
import { ItemsComponent } from './items/items.component';
import { DescriptionComponent } from './description/description.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DataService } from './data.service';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NavbarComponent } from './navbar/navbar.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FeedsComponent,
    ItemsComponent,
    DescriptionComponent,
    StatisticsComponent,
    NavbarComponent
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
