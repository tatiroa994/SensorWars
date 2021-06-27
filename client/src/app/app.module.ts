import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterAlertComponent } from './components/register-alert/register-alert.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { NotificationAlertComponent } from './components/notification-alert/notification-alert.component';
import { HttpClientModule} from '@angular/common/http';
import { FetchDataService } from './services/fetch-data.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterAlertComponent,
    SensorsComponent,
    NotificationAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [FetchDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
