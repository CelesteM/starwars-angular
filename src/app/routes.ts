import { Routes } from "@angular/router";
import { PlanetDetailsComponent } from "./planet-details/planet-details.component";
import { AppComponent } from "./app.component";
import { PlanetListComponent } from "./planet-list/planet-list.component";

const routeConfig: Routes = [
    {
        path: '',
        component: PlanetListComponent,
        title: 'Explore planets from Star Wars'
    },
    {
        path: 'planets/:id',
        component: PlanetDetailsComponent,
        title: 'Planet details'
    }
];

export default routeConfig;