import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetDetail } from '../planet';
import { AxiosService } from '../services/axios.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent {
  axiosService = inject(AxiosService);
  planetDetails$: Observable<PlanetDetail>;
  planetId: string;

  constructor(private activedRoute: ActivatedRoute) {
    this.activedRoute.params.subscribe(params => {
      this.planetId = params['id'];
    });

    this.planetDetails$ = this.axiosService.getPlanetDetail(this.planetId);
  }
}
