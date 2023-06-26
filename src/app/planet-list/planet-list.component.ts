import { Component, OnInit, inject } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { AxiosService } from '../services/axios.service';
import { PlanetMetadata } from '../planet';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  planets$: Observable<PlanetMetadata[]>;
  axiosService: AxiosService = inject(AxiosService);

  ngOnInit() {
    this.planets$ = this.axiosService.getPlanets();
    this.planets$.subscribe(res => console.log(res));
  }
}
