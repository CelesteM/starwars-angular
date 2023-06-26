import { Injectable } from "@angular/core";
import axios from 'axios';
import { Observable, combineLatest, combineLatestAll, concat, concatMap, forkJoin, from, map, merge, mergeAll, mergeMap, of, pipe, switchMap, tap, toArray, zip } from "rxjs";
import { PlanetMetadata, PlanetDetail } from "../planet";

const serviceApi = axios.create({
    baseURL: 'https://swapi.dev/api',
});

@Injectable()
export class AxiosService {

    getPlanets(): Observable<PlanetMetadata[]> {
        return concat(
            this.getPlanetsByPage('1'),
            this.getPlanetsByPage('2'),
            this.getPlanetsByPage('3'),
            this.getPlanetsByPage('4'),
            this.getPlanetsByPage('5'),
            this.getPlanetsByPage('6')
        ).pipe(mergeAll(), toArray(), map(items => items.sort(this.sortByName)));
    }

    getPlanetDetail(planetId: string): Observable<PlanetDetail> {
        return from(serviceApi.get(`/planets/${planetId}`))
            .pipe(
                map(res => res.data),
                map(item => {
                    return {
                        name: item.name,
                        rotation_period: item.rotation_period,
                        orbital_period: item.orbital_period,
                        diameter: item.diameter,
                        climate: item.climate,
                        gravity: item.gravity,
                        terrain: item.terrain,
                        surface_water: item.surface_water,
                        population: item.population,
                        residents: this.setResidentsNames(item.residents)
                    }
                })
            );
    }

    private setResidentsNames(residentsUrls: string[]): Observable<string[]> {
        return of(residentsUrls).pipe(
            mergeMap(data => data),
            map(url => {
                const urlParts = url.split('/');
                const id = urlParts[urlParts.length - 2];
                return from(serviceApi.get(`/people/${id}`)).pipe(
                    map(data => data.data.name),
                );
            }),
            mergeAll(),
            toArray()
        );
    }

    private getPlanetsByPage(page: string): Observable<PlanetMetadata[]> {
        return from(serviceApi.get(`/planets/?page=${page}`))
            .pipe(
                map(res => {
                    return res.data.results.map((item: any) => {
                        const urlParts = item.url.split('/');
                        return {
                            name: item.name,
                            id: urlParts[urlParts.length - 2]
                        }
                    });
                }
                )
            );
    }

    private sortByName(a: PlanetMetadata, b: PlanetMetadata): number {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

}