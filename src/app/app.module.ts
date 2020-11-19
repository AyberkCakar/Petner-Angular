import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {  HttpClientModule } from '@angular/common/http';
import { IgxCardModule } from 'igniteui-angular';
import { NgSearchFilterModule } from 'ng-search-filter';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { AdvertComponent } from './advert/advert.component';
import { AddAdvertComponent } from './add-advert/add-advert.component';
import { UpdateAdvertComponent } from './update-advert/update-advert.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NotifierModule, NotifierOptions } from 'angular-notifier';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    AdvertComponent,
    AddAdvertComponent,
    UpdateAdvertComponent,
    AdvertDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    IgxCardModule,
    NgImageSliderModule,
    NgSearchFilterModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

