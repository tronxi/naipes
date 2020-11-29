import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { GameComponent } from './game/game.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersonalRecordsComponent } from './records/personal-records/personal-records.component';
import { TotalRecordsComponent } from './records/total-records/total-records.component';
import {TokenInterceptorService} from './interceptors/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    RecordsComponent,
    GameComponent,
    PreferencesComponent,
    LoginComponent,
    RegistroComponent,
    PersonalRecordsComponent,
    TotalRecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
