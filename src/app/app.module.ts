import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AxiosService } from './services/axios.service';
import { RouterModule, provideRouter } from '@angular/router';
import routeConfig from './routes';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { PlanetListComponent } from './planet-list/planet-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanetDetailsComponent,
    PlanetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    AxiosService,
    provideRouter(routeConfig)],
  bootstrap: [AppComponent]
})
export class AppModule { }
