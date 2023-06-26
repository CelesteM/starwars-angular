import { Observable } from "rxjs";

export interface PlanetMetadata {
    name: string;
    // rotation_period: string;
    // orbital_period: string;
    // diameter: string;
    // climate: string;
    // gravity: string;
    // terrain: string;
    // surface_water: string;
    // population: string;
    id: string;
  }

  export interface PlanetDetail {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: Observable<string[]>;
    // residents: string[];
  }