import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  urlBase = "https://dummyjson.com/";

  constructor(private http: HttpClient) { }

  getProducts (page: number = 0){
    return this.http.get(`${this.urlBase}products`, {
      params: {
        skip: page,
        limit: 12
      }
    });
  }
  
}