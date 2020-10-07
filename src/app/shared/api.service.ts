import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  configUrl = "http://80.249.81.144:8056/api/data";

  getData():Observable<any>{    
    return this.fetch(`${this.configUrl}/get`);
  }

  searchBy(string):Observable<any>{
    return this.fetch(`${this.configUrl}/get?searchByText=${string}`);
  }

  update(object):Observable<any>{
    return this.http.put(`${this.configUrl}/update`, object);
  }

  delete(id):Observable<any>{
    return this.http.delete(`${this.configUrl}/delete?id=${id}`);
  }

  fetch(url):Observable<any>{
    return fromFetch(url).pipe(
      switchMap(response => {
        if (response.ok) {
          // OK return data
          return response.json();
        } else {
          // Server is returning a status requiring the client to try something else.
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError(err => {
        // Network or other error, handle appropriately
        console.error(err);
        return of({ error: true, message: err.message })
      })
    );
  }
  
}
