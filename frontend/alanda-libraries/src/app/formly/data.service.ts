import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {}

  getNations(): Observable<any[]> {
    return of([
      {value: null, label: ' --- '},
      {value: 1, label: 'Germany'},
      {value: 2, label: 'Italy'},
      {value: 3, label: 'Austria'},
      {value: 4, label: 'USA'}
    ]);
  }

  getCities(nationsId: number = null): Observable<any[]> {
    return of([
      {value: null, label: ' --- ', nationId: null},
      {value: 1, label: 'Vienna', nationId: 3},
      {value: 2, label: 'Salzburg', nationId: 3},
      {value: 3, label: 'Munich', nationId: 1},
      {value: 4, label: 'Rome', nationId: 2},
      {value: 5, label: 'Bolzano', nationId: 2},
      {value: 6, label: 'New York', nationId: 4},

    ].filter(entry => {
      if (nationsId) {
        return entry.nationId === nationsId;
      } else {
        return true;
      }
    }));
  }

}
